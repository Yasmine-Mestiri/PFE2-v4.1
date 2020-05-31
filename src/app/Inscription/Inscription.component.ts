import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { EtudientService } from '../services/etudient.service';
import { Etudient } from 'app/models/Etudient.model';
import { EnseignantService } from '../services/enseignant.service'
import { Enseignant } from 'app/models/Enseignant.model';


@Component({
	selector: 'app-Inscription',
	templateUrl: './Inscription.component.html',
	styleUrls: ['./Inscription.component.css']
})

export class InscriptionComponent implements OnInit {

	signupForm: FormGroup;
	errorMessage: string;
	fileIsUploading = false;
	fileUrl: String;
	fileUploaded = false;
	picname: String;





	constructor(private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router, private etudientservice: EtudientService, private enseignantService: EnseignantService) {

	}
	ngOnInit() {


		$(function () {

			function maskImgs() {
				//$('.img-wrapper img').imagesLoaded({}, function() {
				$.each($('.img-wrapper img'), function (index, img) {
					var src = $(img).attr('src');
					var parent = $(img).parent();
					parent
						.css('background', 'url(' + src + ') no-repeat center center')
						.css('background-size', 'cover');
					$(img).remove();
				});
				//});
			}
			var preview = {
				init: function () {
					preview.setPreviewImg(null);
					preview.listenInput();
				},
				setPreviewImg: function (fileInput) {
					var path = $(fileInput).val();
					var uploadText = $(fileInput).siblings('.file-upload-text');
					if (!path) {
						$(uploadText).val('');
					} else {
						path = path['replace'](/^C:\\fakepath\\/, "");
						$(uploadText).val(path);
						preview.showPreview(fileInput, path, uploadText);
					}
				},
				showPreview: function (fileInput, path, uploadText) {
					var file = $(fileInput)[0].files;
					if (file && file[0]) {
						var reader = new FileReader();
						reader.onload = function (e) {
							var previewImg = $(fileInput).parents('.file-upload-wrapper').siblings('.preview');
							var img = $(previewImg).find('img');
							if (img.length == 0) {
								$(previewImg).html('<img src="' + e.target['result'] + '" alt=""/>');
							} else {
								img.attr('src', e.target['result']);
							}
							uploadText.val(path);
							maskImgs();
						}
						reader.onloadstart = function () {
							$(uploadText).val('uploading..');
						}
						reader.readAsDataURL(file[0]);
					}
				},
				listenInput: function () {
					$('.file-upload-native').on('change', function () {
						preview.setPreviewImg(this);
					});
				}
			};
			preview.init();
		});

		this.initForm();

	}





	initForm() {
		this.signupForm = this.formBuilder.group({
			email: ['', [Validators.required]],
			Adresse: ['', [Validators.required]],
			Nom: ['', [Validators.required]],
			prenom: ['', [Validators.required]],
			Localisation: ['', [Validators.required]],
			photo: ['', [Validators.required]],
			Numero: ['', [Validators.required, Validators.pattern(/[0-9]{8,}/)]],
			password: ['', [Validators.required, Validators.pattern(/[0-9]{7,}/)]]
		});
		const email = this.signupForm.get('email').value;
		const password = this.signupForm.get('password').value;
		console.log(this.authService.createNewUser(email, password));
	}
	onSubmit() {
		var timee = new Date().toUTCString();
		var MessageRecu = "";
		var MessageEnvoyer = "";
		const email = this.signupForm.get('email').value;
		const password = this.signupForm.get('password').value;
		const Adresse = this.signupForm.get('Adresse').value;
		const Nom = this.signupForm.get('Nom').value;
		const prenom = this.signupForm.get('prenom').value;
		const Numero = this.signupForm.get('Numero').value;
		const Localisation = this.signupForm.get('Localisation').value;
		const picname = this.etudientservice.photoname();





		this.authService.createNewUser(email, password).then(
			(useret) => {
				if (useret == "is etudiant") {
					const newetudient = new Etudient(picname, email, password, Adresse, Nom, prenom, Numero, Localisation, MessageRecu, MessageEnvoyer);
					if (this.fileUrl && this.fileUrl !== '') {
						newetudient.photo = this.fileUrl;
						//console.log(this.fileUrl);
					}

					this.etudientservice.creatnewetudient(newetudient);
					firebase.database().ref('/Notifications').child('gHKJfbMlBJTbGDtcxK4MY6K67YW2').push({
						body: Nom + " " + prenom + " a été inscrit dans la plateforme ",
						title: "Inscription:",
						icon: newetudient.photo,
						show: false,
						time: timee,
						gotto: "inscription"
					})
					//console.log('donne');
					this.router.navigate(['/Accueil']);
					this.authService.signOutUser();


				} else if (useret == "is enseignant") {

					const newenseignant = new Enseignant(picname, email, password, Adresse, Nom, prenom, Numero, Localisation, MessageRecu, MessageEnvoyer);
					if (this.fileUrl && this.fileUrl !== '') {
						newenseignant.photo = this.fileUrl;
						//console.log(this.fileUrl);
					}
					this.enseignantService.creatnewenseignant(newenseignant);
					firebase.database().ref('/Notifications').child('gHKJfbMlBJTbGDtcxK4MY6K67YW2').push({
						body: Nom + " " + prenom + " a été inscrit dans la plateforme ",
						title: "Inscription:",
						icon: newenseignant.photo,
						show: false,
						time: timee,
						gotto: "inscription"
					})
					
					//console.log('donne');
					this.router.navigate(['/Accueil']);
					this.authService.signOutUser();
				}

			},
			(error) => {
				this.errorMessage = error;
			}
		);
	}

	onUploadFile(file: File) {
		this.fileIsUploading = true;
		this.etudientservice.uploadFile(file).then(
			(url: string) => {
				this.fileUrl = url;
				this.fileIsUploading = false;
				this.fileUploaded = true;
				console.log('fichier charger');

			}
		);
	}
	detectFiles(event) {
		this.onUploadFile(event.target.files[0]);
	}


}







