package gamefaceproductions.gamefacewebsite.controller;

import docrob.venusrestblog.data.Category;
import docrob.venusrestblog.repository.CategoriesRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/categories", produces = "application/json")
public class CategoriesController {
    private final CategoriesRepository categoriesRepository;

    public CategoriesController(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    @GetMapping("")
    private List<Category> fetchAllCategories(@RequestParam String categoryName) {
        assert categoryName != null;
        if (categoryName.length() > 0) {
            Category cat = categoriesRepository.findByName(categoryName);
            if (cat == null) {
                return null;
            }
            return new ArrayList<>(List.of(categoriesRepository.findByName(categoryName)));
        }
        return categoriesRepository.findAll();
    }
}
