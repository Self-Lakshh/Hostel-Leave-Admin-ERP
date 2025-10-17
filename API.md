CREATE HOSTEL
"curl -X POST http://localhost:4141/api/admin/create-hostel -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"hostel_name\":\"BH2\",\"check_out_start_time\":\"06:00\",\"latest_return_time\":\"22:00\",\"ou
ting_allowed\":true,\"room_occupancy\":4,\"total_rooms\":50}""

UPDATE HOSTEL
"curl -X PUT http://localhost:4141/api/admin/update-hostel/HOSTEL-BH2 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"room_occupancy\":3}""

INACTIVE HOSTEL
"curl -X PUT http://localhost:4141/api/admin/inactive-hostel/HOSTEL-BH2 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=""

GET ALL HOSTEL LIST
"curl -X GET http://localhost:4141/api/student/all-hostel-info -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=""

GET HOSTEL-INFO
"curl -X GET http://localhost:4141/api/admin/hostel/HOSTEL-BH1 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=""

GET BRANCH
"curl -X GET http://localhost:4141/api/student/all-branches -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=""

CREATE BRANCH
"curl -X POST http://localhost:4141/api/admin/create-branch -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"branch_name\":\"civil\",\"max_semester\":8}"
"

UPDATE BRANCH
"curl -X POST http://localhost:4141/api/admin/update-branch/BRANCH-CIVIL -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"active\":\"false\"}" "


CREATE STUDENT
"curl -X POST http://localhost:4141/api/admin/create-student -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"enrollment_no\":\"22CS002541\",\"name\":\"Rahul Verma\",\"email\":\"rahul@example.com\",\"phone_no\":\"9876543217\",\"hostel_id\":\"HOSTEL-BH1\",\"room_no\":\"1\",\"semester\":1,\"branch\":\"civil\",\"parent1_name\":\"Suresh Verma\",\"parent1_phone\":\"9123456791\",\"parent1_relation\":\"Father\",\"parent2_name\":\"Anita Verma\",\"parent2_phone\":\"9988776657\",\"parent2_relation\":\"Mother\"}" "

UPDATE STUDENT
"curl -X PUT http://localhost:4141/api/admin/update-student/22CS002539 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"student\":{\"active\":true}, \"parents\":{}}""

SEARCH STUDENT BY ENROLLMENT NO.
"curl -X GET http://localhost:4141/api/admin/student/22CS002539 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=""

GET ALL STUDENTS AND PARENTS DETAILS
"curl -X GET http://localhost:4141/api/admin/all-students -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=""


CREATE ASST. AND SENIOR WARDEN
"curl -X POST http://localhost:4141/api/admin/create-warden -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"wardenType\":\"senior_warden\",\"name\":\"Ramesh Kumar\",\"emp_id\":\"WARDEN-EMP001\",\"hostel_id\":\"HOSTEL-BH1\",\"phone_no\":\"9876543210\",\"email\":\"ramesh.kumar@spsu.ac.in\"}""

UPDATE ASST. AND SENIOR WARDEN
"curl -X PUT http://localhost:4141/api/admin/update-warden/WARDEN-EMP001 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"name\":\"Suresh Mehta\"}""


GET LIST OF WARDENS
"curl -X GET http://localhost:4141/api/admin/all-wardens -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" "


CREATE ADMIN
"curl -X POST http://localhost:4141/api/admin/create-admin -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"name\":\"Aftab Khan\",\"email\":\"aftab.khan@spsu.ac.in\",\"emp_id\":\"EMP002\",\"phone_no\":\"9876543219\"}""

UPDATE ADMIN
"curl -X PUT http://localhost:4141/api/admin/update-admin/EMP002 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"phone_no\":\"9876543212\"}""

LIST ALL ADMINS
"curl -X GET http://localhost:4141/api/admin/all-admins -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA="  





GET REQUESTS BY HOSTEL ID
"curl -X GET http://localhost:4141/api/request/hostel-requests/HOSTEL-TAGORE-HOSTEL -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" "


GET REQUESTS BY STATUS
"curl -X GET http://localhost:4141/api/request/requests/:status -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" "


GET REQUESTS BY ID
"curl -X GET http://localhost:4141/api/request/request/:id -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" " 


GET TOTAL NO. OF STUDENTS
"curl -X GET http://localhost:4141/api/admin/total-students -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA="  


GET OUT STUDENTS
"curl -X GET http://localhost:4141/api/admin/outstudents -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA="


GET ALL ACTIVE REQUESTS
"curl -X GET http://localhost:4141/api/admin/all-active-requests -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA="                     "


CREATE SECURITY GURAD
"curl -X POST http://localhost:4141/api/admin/create-security-guard -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"name\":\"Rahul Singh\",\"phone_no\":\"9876543217\",\"email\":\"rahul.singh@spsu.ac.in\",\"emp_id\":\"EMP002\"}" "


UPDATE SECURITY GURAD
"curl -X PUT http://localhost:4141/api/admin/update-security-guard/EMP002 -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA=" -H "Content-Type: application/json" -d "{\"phone_no\":\"9876543218\"}" "

GET ALL SECURITY GUARD
"curl -X GET http://localhost:4141/api/admin/all-security-guards -H "Authorization: Bearer fQS5LZW7LiTEZmhx6vzqiyr7OooQ3fRKcUKuyvzOVp6Xk1pj2qT2uGWYj8qdnhXyApTJ1FGDYvhh3CVEgxTzBHkk3Z29H0VjevEWHMtxbPpMohwvB9TTHSS4FphpB7OyjV226JZsNEFPIEwpYQTTwkMzCvmD+dW54SUDygzEO0zuOkxlQDD2PA3upvbX/evfxLLP4BCsfXiJC25gtfSwORLti+rYNWzrb/Ryr4GJMLure4yfYGRsgA+2EyRP6RAPqL2iKch6IxaGQwaLljE8isSQGQifZQRjkvADZe958xA="" 
