Project Setup - git clone https://github.com/WebMohit20/school_payment_dashboard__backend.git

Intstall Dependencies - npm intsall

setup .env - go through with sample.env give your MONGO_URI

start project - npm run start

Test user api - signup, login and logout

POST /signup - http://localhost:3000/api/v1/signup 
request body - {
  "name": "<string>",
  "email": "<string>",           
  "password": "<string>",     
}
POST /login - http://localhost:3000/api/v1/login 
request body - {
  "email": "<string>",           
  "password": "<string>",     
}

DELETE /logout - http://localhost:3000/api/v1/logout
logout api will only work when user is already login 

Test create_payment api - create_payment

POST /create-payment - http://localhost:3000/api/v1/create-payment
request body - {
    school_id:"<string>",
    trustee_id:"<string>",
    student_info:"<string>",
    gateway_name:"<string>",
    amount:"<string>",             
    callback_url:"<string>" 
}
amount and callback_url required field
user must be login for this api


Test transaction api - transactions, transactionsbyschool, transaction-status


GET /transactions - http://localhost:3000/api/v1/transactions
request query - {
    page:"<string>", -- in numerics only
    limit:"<string>" -- in numerics only
    sort:"<string>", -- payment_time, status or transaction_amount
    order:"<string>" -- asc or desc
}
user must be login for this api


GET /transactions/school/:schoolId - http://localhost:3000/api/v1/transactions/school/:schoolId
request params - {
    schoolId:"<string>"
}
request query - {
    page:"<string>", -- in numerics only
    limit:"<string>" -- in numerics only
    sort:"<string>", -- payment_time, status or transaction_amount
    order:"<string>" -- asc or desc
}
user must be login for this api


GET /transaction-status - http://localhost:3000/api/v1/transaction-status/:collect_request_id
request params - {
    collect_request_id:"<string>"
}
user must be login for this api

Test webhook api - webhook

POST /webhook - http://localhost:3000/api/v1/webhook

request body - {
    order_info:{
        order_id, -- must have
        order_amount,
        transaction_amount,
        payment_mode,
        payment_details,
        bank_refrence,
        payment_message,
        status,
        error_message,
        payment_time
    }
}
