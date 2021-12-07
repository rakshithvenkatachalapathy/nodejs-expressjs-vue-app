## _Instructions to run the app_

Please note: There is some latency with the database and hence the page may have to refreshed

Clone the repository and cd into the reposoiroty that you cloned

Once in the repository, run the following two commands

1. `npm install`
2. `node server.js`

The on the browser go to the URL  
**http://localhost:8080/**

_Please referesh the page if the contents of the employee database are not shown on the page_


List of API's implemented
1. GET all employees :   
http://localhost:8080/api/employees/

2. To insert a new employee:  
    `POST http://localhost:8080/api/employees/`

    with the Body

    {  
    "firstName": "rak",  
    "lastName": "venkat",  
    "address": "556 burnett ave",  
    "dateOfJoining": "2017-02-24"  
    }

3. To insert a new number:
    Get the employee id of the employee to which you want to add the phone number  
    Then use the same employee id as 'id' parameter in the post request for inserting numbers  
    Please find the below URL and body for inserting into employee with an employee id 8  
    `POST http://localhost:8080/api/employees/numbers`  

    with the body

    {  
        "id": 8,  
        "phoneNumber": "6549214567",  
        "type": "home"  
    }

4. To update details of an employee use the PUT method  
    To update the details of the employee with id=4 use the below request  
    `PUT http://localhost:8080/api/employees/4`

    with the body  
    {  
    "firstName": "rakshith",  
    "lastName": "venkat",  
    "address": "556 burnett ave, san francisco",  
    "dateOfJoining": "2017-02-24"  
    }  

5. To delete an based on emplpyee id use the below request  
    `DELETE http://localhost:8080/api/employees/11`  
    This will delete the employee with the employee id   

6. To delete all employees use the below request  
    `DELETE http://localhost:8080/api/employees/`  

7. To search based on first and last name use the below request  
    `GET http://localhost:8080/api/employees/jim/morris`  
    This performs a search based on first name 'jim' and last name 'morris'  