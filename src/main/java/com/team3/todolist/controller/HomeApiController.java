package com.team3.todolist.controller;

import com.team3.todolist.entity.ToDoEntity;
import com.team3.todolist.service.ToDoService;
import com.team3.todolist.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class HomeApiController {

    private final ToDoService toDoService;
    private final UserService userService;

    // GET 요청: 투두리스트 조회
    @GetMapping(value = "/todolist")
    public ResponseEntity<List<ToDoEntity>> todolist() {
        List<ToDoEntity> toDoEntityList = this.toDoService.getList();
        return ResponseEntity.ok(toDoEntityList);
    }

    // POST 요청: 새로운 투두 추가
    @PostMapping(value = "/todolist")
    public ResponseEntity<ToDoEntity> insertdata(@RequestBody ToDoEntity toDoEntity) {
        ToDoEntity savedEntity = toDoService.insertdata(toDoEntity);
        return ResponseEntity.ok(savedEntity);
    }

    // PATCH 요청: 투두 수정
    @PatchMapping(value = "/todolist/{id}")
    public ResponseEntity<ToDoEntity> updateTodo(@PathVariable("id") int id, @RequestBody ToDoEntity updatedToDo) {
        ToDoEntity updatedEntity = toDoService.updateData(id, updatedToDo);
        return ResponseEntity.ok(updatedEntity);
    }


    // DELETE 요청: 투두 삭제
    @DeleteMapping(value = "/todolist/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("id") int id) {
        toDoService.deleteData(id);
        return ResponseEntity.noContent().build();
    }

}
