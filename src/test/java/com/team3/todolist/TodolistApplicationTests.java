package com.team3.todolist;

import com.team3.todolist.entity.ToDoEntity;
import com.team3.todolist.repository.ToDoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TodolistApplicationTests {

	@Autowired
	private ToDoRepository toDoRepository;

	@Test
	void contextLoads() {
		ToDoEntity todo1 = new ToDoEntity();
		todo1.setTitle("똥싸기");
		todo1.setDescription(Boolean.TRUE);
		this.toDoRepository.save(todo1);

		ToDoEntity todo2 = new ToDoEntity();
		todo2.setTitle("밥먹기");
		todo2.setDescription(Boolean.FALSE);
		this.toDoRepository.save(todo2);
	}

}
