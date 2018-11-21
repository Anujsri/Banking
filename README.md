
## Banking
 It is a simple banking platform,where a borrower requests for loan and all lender can see his
 loan request and the information about loan(like amount,time period etc..)  and about the borrower
 who is asking for loan, and lender can accept or reject his loan request.
 
## Technology Used ##

 NodeJs, Express, MongoDB, AJAX, REST API, GitHub API, JavaScript, Google API ,Facebook API.
 
## Usage ##

We have three user                                                                                                          

     1. Admin
     2. Lender
     3. Borrower
    
    
                                                   # Basic Functionality
                                                      
  1. As we have three user but for login and signup I am creating only single collection(table). I am not 
     giving any option to user for login as a admin, I have created it at the time of database creation.
  
  2. When a user signup we will ask him which type of user he is(lender or borrower) by giving him a 
     dropdown option.And when a user login then according to usertype we will show him his page and ask him
     to complete his profile so that we can intesrt him his respective table(collection).
     
  3. If a user login by Google or Facebook then we will ask him which type of user he is(lender or borrower)
     by giving him a dropdown option. so that we can add him his respective table.
     
     
                                                           
                                                    # Admin Functionalty
                                                       
                                                       
  1. When a lender or borrower will complete his profile a request will go to admin, and admin will check all
     the information of lender or borrower and if admin find that he elegible to work with us then he can 
     accept his request if not then he can reject.
     
  2. Admin can see all the lender and borrower which are working with us.
  
  
                                                    # Lender Functionality
                                                       
                                                       
  1. Lender can give the loan to the borrower only if his profile is completed and accepted by admin.If his profile
     is completed but not accepted by admin he can not give the loan to borrower.
     
  2. Lender can see all the loan requests and after seeing all the information about the borrower of that
     respective loan request he can accept or reject the loan request.
     
     
                                                     # Borrower Functionality
                                                       
                                    
  1. Borrower can apply for the loan only if his profile is completed and accepted by admin.If his profile
     is completed but not accepted by admin he can not apply for the loan.
     
  2. Borrower can see all his loan requests and the status of loan requests whether the requests have been 
     accepted by a lender or not.
     
  3. If a loan request is accepted then he can see all the information about the lender who has accepted the 
     loan request.
     
     
 
    ### Installation required for app
    ```sh
    $ npm install
    ```

    ```sh
    $ npm start
    ```
    ## Open Website(Heroku Link)
    https://gittask.herokuapp.com

  
  
  
  
  
