package com.ageev.step.springapireact.repo;

import com.ageev.step.springapireact.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}
