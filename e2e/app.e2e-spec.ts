import { MaterialAccueilAngularPage } from './app.po';

describe('material-Accueil-angular App', () => {
  let page: MaterialAccueilAngularPage;

  beforeEach(() => {
    page = new MaterialAccueilAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
