
INSERT INTO department(name)
VALUES("Kitty Kitchen"),
("Kitty Cleanup"),
("Kitty Care");



INSERT INTO role(title, salary, department_id)
VALUES("Barista", 15.70, 1),
("Chef", 23.00, 1),
("Cleaner", 14.50, 2),
("Cat Companion", 22.00, 3),
("Vet Tech", 30.00, 3),
("Veterinarian", 85.00, 3);


INSERT INTO employee(first_name,last_name,role_id, manager_id)
VALUES
("Catty", "KitKats", 5 ,NULL),
("Sniff", "Mcwhiskers", 4, NULL ),
("Neat", "Kibbles", 6, NULL),
("Beady", "Eyes", 5, 3),
("Licky", "Lips", 2, NULL),
("Creamy", "Darkroast", 1, 5),
("Sudder", "Tugs",3, NULL),
("Pancho", "Pancake", 3, NULL);