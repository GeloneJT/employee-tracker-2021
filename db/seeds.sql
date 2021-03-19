INSERT INTO department(name)
VALUES("Sales"), ("Engineering"), ("Finance"),("Legal");

iNSERT INTO role(title,salary,department_id)
VALUES("Sales Analyst",50000 ,1), ("Sales Director",120000,1), ("Software Engineer",100000 ,2 ), ("Software Artitect",135000 ,2), ("Financial Analyst",82000 ,3), ("CFO",360000 ,3), ("Legal Analyst",80000 ,4), ("General Counsel",158000 ,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Tai", "Kaliso",1 ,2 ), ("Marcus", "Fenix",3 ,NULL ), ("Anya", "Stroud", 4,NULL), ("Augustus", "Cole",1 ,NULL), ("Clayton", "Carmine",2 ,2), ("Damon", "Baird", 2,NULL), ("Jace", "Stratton",3 ,3), ("Samantha", "Byrne",4, 4);
