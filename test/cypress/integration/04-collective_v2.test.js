import { disableSmoothScroll } from '../support/helpers';
import { Sections } from '../../../components/collective-page/_constants';
import 'cypress-file-upload';

const uploadImage = ({ dropzone, file }) => {
  cy.fixture(`./images/${file}`).then(picture => {
    cy.get(dropzone).upload({
      fileContent: picture,
      fileName: file,
      mimeType: 'image/'.concat(file.includes('.png') ? 'png' : 'jpeg'),
    });
  });
  cy.wait(900);
};

describe('New collective page', () => {
  let collectiveSlug = null;

  const scrollToSection = section => {
    // Wait for new collective page to load before disabling smooth scroll
    cy.contains('Become a financial contributor');
    disableSmoothScroll();
    cy.get(`#section-${section}`).scrollIntoView();
  };

  before(() => {
    cy.createHostedCollective({
      twitterHandle: 'testCollective',
      githubHandle: 'testCollective',
      website: 'opencollective.com/testCollective',
    })
      .then(({ slug }) => (collectiveSlug = slug))
      .then(() => cy.visit(`/${collectiveSlug}/v2`));
  });

  beforeEach(() => {
    cy.login({ redirect: `/${collectiveSlug}/edit` });
  });

  describe('Hero', () => {
    it('Must have links to twitter, github and website', () => {
      cy.get('[data-cy=twitterProfileUrl]').should('have.attr', 'href', 'https://twitter.com/testCollective');
      cy.get('[data-cy=githubProfileUrl]').should('have.attr', 'href', 'https://github.com/testCollective');
      cy.get('[data-cy=collectiveWebsite]').should('have.attr', 'href', 'https://opencollective.com/testCollective');
    });

    it('Must have the fiscal host displayed', () => {
      cy.get('[data-cy=fiscalHostName]').should('have.visible');
    });

    it('Can change avatar', () => {
      uploadImage({
        dropzone: '[data-cy=heroAvatarDropzone]',
        file: 'gophercon.jpg',
      });
      cy.get('[data-cy=heroAvatarDropzoneSave]').click();
    });

    it.skip('Can edit primary color', () => {
      // TODO - must check hero or buttons CSS to ensure primary color is properly applied
    });

    it('Can change cover background image', () => {
      uploadImage({
        dropzone: '[data-cy=heroBackgroundDropzone]',
        file: 'gopherBack.png',
      });
      cy.get('[data-cy=heroBackgroundDropzoneSave]').click();
    });
  });

  describe('Contribute section', () => {
    it('Show tiers with default descriptions', () => {
      const oneTimeContributionMsg = 'Make a custom one time or recurring contribution to support this collective.';
      cy.contains('#section-contribute', 'Custom contribution');
      cy.contains('#section-contribute', 'Donation');
      cy.contains('#section-contribute', oneTimeContributionMsg);
      cy.contains('#section-contribute', 'backer');
      cy.contains('#section-contribute', 'Become a backer for $5.00 per month and help us sustain our activities!');
      cy.contains('#section-contribute', 'sponsor');
      cy.contains('#section-contribute', 'Become a sponsor for $100.00 per month and help us sustain our activities!');
    });

    it('Has a link to show all tiers', () => {
      cy.contains(`#section-contribute a[href="/${collectiveSlug}/contribute"]`, 'View all the ways to contribute');
    });

    it.skip('Has a link to create new tiers and events if admin', () => {
      // TODO
    });

    it.skip('Displays top contributors', () => {
      // TODO
    });
  });

  describe('Updates section', () => {
    it.skip('Has a link to create new update and one to view all updates', () => {
      // TODO
    });

    it.skip('Shows latest updates', () => {
      // TODO
    });
  });

  describe('Budget section', () => {
    it.skip('Shows latest transactions with amount and type (credit/debit)', () => {
      // TODO
    });

    it.skip('Has button to view all transactions and expenses', () => {
      // TODO
    });

    it.skip("Shows today's balance and estimated annual budget", () => {
      // TODO
    });
  });

  describe('Contributors section', () => {
    it.skip('Shows contributors with role, public message and total amount contributor', () => {
      // TODO
    });

    it.skip('Can filter contributors', () => {
      // TODO
    });
  });

  describe('About section', () => {
<<<<<<< HEAD
    it('Can add description to about section', () => {
      const richDescription = 'Hello world!{selectall}{ctrl}b';
<<<<<<< HEAD
=======
    // TODO: unskip
    it.skip('Can add description to about section', () => {
      const richDescription = 'Hello{selectall}{ctrl}B{rightarrow}{ctrl}B world!';
>>>>>>> test(04-collective_v2.test.js): add hero section test for collective - incomplete
      cy.login({ redirect: `/${collectiveSlug}/v2` });
=======
>>>>>>> update login process to use beforeEach
      scrollToSection(Sections.ABOUT);
      cy.contains('#section-about button', 'Add a description').click();
      cy.get('#section-about [data-cy="RichTextEditor"] trix-editor').type(richDescription);
      cy.get('[data-cy="InlineEditField-Btn-Save"]').click();
      cy.get('[data-cy="longDescription"]').should('have.html', '<div><strong>Hello world!</strong></div>');
    });
  });
});

describe('New Collective page with euro currency', () => {
  // TODO: uncomment out before
  // before(() => {
  //   cy.visit('/brusselstogether/v2');
  // });
  // TODO: unskip
  it.skip('contributors amount in euro', () => {
    cy.get('[data-cy=ContributorsGrid_ContributorCard]')
      .first()
      .contains('€5,140 EUR');
  });
});
