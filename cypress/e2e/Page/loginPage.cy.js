//login to the applocation
class LoginPage {
    constructor() {
      this.loginButton = '[value="Login"]';
     // this.emailAddress = 'input[name="email"]';
      this.emailAddress = '#input-email';
  
      //this.password = 'input[name="password"]';
      this.password = '#input-password';
     
  
      this.logout = ".list-group-item";
      this.newsLetter = ".list-group-item";
      this.editAccount = "a.d-inline-flex.text-decoration-none.text-reset.flex-column.my-3"
      this.backButton = ".float-left";
      this.register = '.list-group-item';
      this.agreeCheckbox = ".custom-control-label::af";
      this.firstName = "#input-firstname" ;
      this.lastName = "#input-lastname";
      //this.emailAdd = "#input-email";
      this.telephoneNumber = "#input-telephone";
      this.password = '#input-password';
      this.confirmpwd = '#input-confirm' ;
  
    }
  
    openUrl() {
      cy.visit(this.url);
    }
  
    loginbuttonexist() {
      cy.get(this.loginButton).should("be.visible");
    }
    enteremailAddress(email) {
      cy.get(this.emailAddress).type(email);
    }
  
    enterPassword(password) {
      cy.get(this.password).type(password);
    }
    clickLogin() {
      cy.get(this.loginButton).click();
    }
  
    clickRegisterMenu() {
      cy.get(this.register).eq(1).click();
    }
    clickEditAccount() {
      //cy.get(this.editAccount).eq(1).click();
      cy.get(this.editAccount).eq(0).click();
  
    }
    clickNewsletter() {
      cy.get(this.newsLetter).eq(12).click();
  
    }
    clickbackButton() {
      cy.get(this.backButton).eq(0).click();
    }
    usr_logged_in() {
      cy.get("h2.card-header.h5").contains("My Account").should("be.visible");
    }
    user_logout() {
    cy.get(this.logout).eq(13).click();
    }
  
    getErrorMessage(){
      cy.contains(' Warning')
    }
  
    fillAccountInformation(accountInfo) {
      cy.get(this.firstName).clear().type(accountInfo.firstName);
      cy.get(this.lastName).clear().type(accountInfo.lastName);
      cy.get(this.telephoneNumber).clear().type(accountInfo.telephoneNumber);
      cy.get('[value="Continue"]').click()
      cy.contains('Success:').should('be.visible')
      cy.get('.list-group-item').eq(1).click()
    } 
    fillUserRegistration(userRegInfo) {
      cy.log(userRegInfo.firstName);
      cy.get(this.firstName).clear().type(userRegInfo.firstName);
      cy.get(this.lastName).clear().type(userRegInfo.lastName);
      cy.log('printing email', userRegInfo.emailAddress);
      cy.get(this.emailAddress).clear().type(userRegInfo.emailaddress);
      cy.get(this.telephoneNumber).clear().type(userRegInfo.telephoneNumber);
      cy.get(this.password).clear().type(userRegInfo.password);
      cy.get(this.confirmpwd).clear().type(userRegInfo.confirmpwd);
      cy.get ('[for="input-agree"]').click()
      cy.get('[value="Continue"]').click()
      cy.wait(4000)
      //cy.contains('Success').should('be.visible')
      cy.get(this.logout).eq(1).click();

    } 

    
  }
  
  module.exports = LoginPage;
  