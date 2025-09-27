import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Animated, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const recipes = [
  { id: 1, title: 'Pasta Carbonara', image: require('./assets/pasta.jpg'), desc: 'Creamy Italian pasta with eggs and pancetta', category: 'Italian' },
  { id: 2, title: 'Veggie Stir Fry', image: require('./assets/vig.jpg'), desc: 'Quick and healthy vegetable stir fry', category: 'Asian' },
  { id: 3, title: 'Chocolate Cake', image: require('./assets/choc.jpg'), desc: 'Rich and decadent chocolate dessert', category: 'Desserts' },
  { id: 4, title: 'Grilled Chicken', image: require('./assets/chick.jpg'), desc: 'Perfectly grilled chicken with herbs', category: 'Healthy' },
  { id: 5, title: 'Salad Bowl', image: require('./assets/salad.jpg'), desc: 'Fresh mixed greens with dressing', category: 'Healthy' },
  { id: 6, title: 'Classic Burger', image: require('./assets/burger.jpg'), desc: 'Juicy beef patty with fresh toppings', category: 'American' },
  { id: 7, title: 'Sushi Rolls', image: require('./assets/sushi.jpg'), desc: 'Fresh fish and perfectly cooked rice', category: 'Asian' },
  { id: 8, title: 'Pizza Margherita', image: require('./assets/pizza.jpg'), desc: 'Classic tomato and basil pizza', category: 'Italian' },
  { id: 9, title: 'Tacos', image: require('./assets/tacos.jpg'), desc: 'Spicy Mexican street-style tacos', category: 'Mexican' },
  { id: 10, title: 'Fruit Smoothie', image: require('./assets/smoothie.jpg'), desc: 'Refreshing blended fruit drink', category: 'Healthy' },
];

// Get unique categories with counts
const getCategories = () => {
  const categories = {};
  recipes.forEach(recipe => {
    categories[recipe.category] = (categories[recipe.category] || 0) + 1;
  });
  return Object.entries(categories).map(([name, count]) => ({ name, count }));
};

const CATEGORIES = getCategories();

// Separate component for Explore recipe cards (fixes hook issue)
function ExploreRecipeCard({ item, onPress }) {
  const [imageError, setImageError] = React.useState(false);
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity 
        style={styles.recipeCard} 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          {!imageError ? (
            <Image 
              source={item.image} 
              style={styles.image}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : null}
          {imageError && (
            <View style={styles.fallbackImage}>
              <Ionicons name="image" size={30} color="#FFFFFF" />
              <Text style={styles.fallbackText}>No image</Text>
            </View>
          )}
        </View>
        
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeDesc}>{item.desc}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ExploreScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchScale] = useState(new Animated.Value(1));

  // Filter recipes based on search and selected category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchFocus = () => {
    Animated.spring(searchScale, { toValue: 1.02, useNativeDriver: true }).start();
  };

  const handleSearchBlur = () => {
    Animated.spring(searchScale, { toValue: 1, useNativeDriver: true }).start();
  };

  const renderRecipeCard = ({ item }) => (
    <ExploreRecipeCard 
      item={item} 
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    />
  );

  const renderCategoryButton = (category) => {
    const isSelected = selectedCategory === category.name;
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
      Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start(() => {
        setSelectedCategory(category.name);
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
      });
    };

    const getCategoryIcon = (name) => {
      switch(name) {
        case 'Italian': return 'pizza';
        case 'Asian': return 'restaurant';
        case 'Desserts': return 'ice-cream';
        case 'Healthy': return 'heart';
        case 'American': return 'fast-food';
        case 'Mexican': return 'flag';
        default: return 'list';
      }
    };

    return (
      <Animated.View key={category.name} style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={getCategoryIcon(category.name)} 
            size={20} 
            color={isSelected ? '#FFFFFF' : '#00BFFF'} 
          />
          <Text style={[styles.categoryButtonText, isSelected && styles.categoryButtonTextSelected]}>
            {category.name} ({category.count})
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Animated.View style={[styles.searchContainer, { transform: [{ scale: searchScale }] }]}>
          <Ionicons name="search" size={20} color="#FF69B4" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#FF69B4" />
            </TouchableOpacity>
          )}
        </Animated.View>
        
        <Text style={styles.resultsText}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </Text>
      </View>

      {/* Categories Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        <Animated.View>
          <TouchableOpacity 
            style={[styles.categoryButton, selectedCategory === 'All' && styles.categoryButtonSelected]}
            onPress={() => setSelectedCategory('All')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="grid" 
              size={20} 
              color={selectedCategory === 'All' ? '#FFFFFF' : '#00BFFF'} 
            />
            <Text style={[
              styles.categoryButtonText, 
              selectedCategory === 'All' && styles.categoryButtonTextSelected
            ]}>
              All ({recipes.length})
            </Text>
          </TouchableOpacity>
        </Animated.View>
        
        {CATEGORIES.map(renderCategoryButton)}
      </ScrollView>

      {/* Recipes List */}
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.recipesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={60} color="#888" />
            <Text style={styles.emptyStateText}>
              No recipes found. Try a different search or category.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchHeader: {
    padding: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingVertical: 15,
    fontSize: 16,
  },
  resultsText: {
    color: '#FF69B4',
    fontSize: 14,
    textAlign: 'center',
  },
  categoriesScroll: {
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  categoryButtonSelected: {
    backgroundColor: '#00BFFF',
    borderColor: '#00BFFF',
  },
  categoryButtonText: {
    color: '#00BFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },
  recipesList: {
    padding: 20,
    paddingTop: 0,
  },
  recipeCard: {
    backgroundColor: '#1e1e1e',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: 'white',
    fontSize: 10,
    marginTop: 5,
  },
  recipeInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDesc: {
    color: '#FF69B4',
    fontSize: 14,
    marginBottom: 10,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    color: '#00BFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
