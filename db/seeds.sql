INSERT INTO department(name)
VALUES("Sales"), ("Engineering"), ("Finance"),("Legal");

iNSERT INTO role(title,salary,department_id)
VALUES("Sales Analyst",50000 ,1), ("Sales Director",120000,1), ("Software Engineer",100000 ,2 ), ("Software Artitect",135000 ,2), ("Financial Analyst",82000 ,3), ("CFO",360000 ,3), ("Legal Analyst",80000 ,4), ("General Counsel",158000 ,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Tai", "Kaliso",2 ,NULL), ("Marcus", "Fenix",4 ,NULL), ("Anya", "Stroud",6 ,NULL), ("Augustus", "Cole",8 ,NULL), ("Clayton", "Carmine",1 ,1), ("Damon", "Baird",3 ,2), ("Jace", "Stratton",5 ,3), ("Samantha", "Byrne",7 ,4);
