import { FitStartPage } from './app.po';

describe('fit-start App', function() {
  let page: FitStartPage;

  beforeEach(() => {
    page = new FitStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
