// <reference types="cypress" />

import LoginPage from "../Page/loginPage.cy.js";
import accountInfo from "../../fixtures/accountInformation.json";
import userRegInfo from "../../fixtures/userregistration.json";
import errMessageValidation from "../../fixtures/errorMessages.json";

describe("Login Test", () => {
  let testdata;
  const emailAddress = getEmailAddress("yahoo.com");
  const loginpage = new LoginPage();

  beforeEach(() => {
    cy.fixture("credential.json").then((testdata_original) => {
      testdata = testdata_original;
    });
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
  });

  it("Login Test", () => {
    loginpage.loginbuttonexist();
  });

  it("valid credential", () => {
    loginpage.enteremailAddress(testdata.emailAddress);
    loginpage.enterPassword(testdata.password);
    loginpage.clickLogin();
    cy.url().should(
      "include",
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
    );
    loginpage.user_logout();
  });

  it("Enter wrong email and password", () => {
    loginpage.enteremailAddress(testdata.invalid_username);
    loginpage.enterPassword(testdata.invalid_password);
    loginpage.clickLogin();
    cy.url().should("not.include", "/web/index.php/dashboard/index");
    loginpage.getErrorMessage();
  });

  it("Enter empty email and password", () => {
    loginpage.clickLogin();
    loginpage.getErrorMessage();
    //cy.url().should('not.include' , '/web/index.php/dashboard/index');
  });
  it("Edit Account", () => {
    loginpage.enteremailAddress(testdata.emailAddress);
    loginpage.enterPassword(testdata.password);
    loginpage.clickLogin();
    cy.url().should(
      "include",
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
    );
    loginpage.clickEditAccount();
    cy.get("#input-firstname").should("value", "David");
    loginpage.user_logout();
  });
  it("NewsLetter", () => {
    loginpage.enteremailAddress(testdata.emailAddress);
    loginpage.enterPassword(testdata.password);
    loginpage.clickLogin();
    cy.url().should(
      "include",
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
    );
    loginpage.clickNewsletter();
    loginpage.clickbackButton();

    //loginpage.user_logout()
  });
  it("Fill Account Information", () => {
    loginpage.enteremailAddress(testdata.emailAddress);
    loginpage.enterPassword(testdata.password);
    loginpage.clickLogin();
    cy.get(".list-group-item").eq(1).click();

    for (let i = 0; i < accountInfo.accountInformation.length; i++) {
      loginpage.fillAccountInformation(accountInfo.accountInformation[i]);
    }
  });

  it("Register the user ", () => {
    for (let i = 0; i < userRegInfo.userRegistration.length; i++) {
      cy.get(".list-group-item").eq(1).click(); //click register
      loginpage.fillUserRegistration(userRegInfo.userRegistration[i]);
    }
  });

  it("Enter empty values in registration", () => {
    cy.get(".list-group-item").eq(1).click();
    cy.get('[value="Continue"]').click();
    
    for (let i = 0; i < errMessageValidation.errorMessages.length; i++) {
       cy.get(".text-danger").eq(i).should("have.text", errMessageValidation.errorMessages[i]);
    }
  });
});

function getEmailAddress(domain) {
  const randomEmail = Math.random().toString(36).substring(7); // 12gsgjs
  return randomEmail + "@" + domain; ///  12gsgjs@yahoo.com
}
