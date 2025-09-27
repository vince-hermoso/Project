import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();

  // Get detailed recipe information
  const getRecipeDetails = (recipeId) => {
    const details = {
      1: {
        ingredients: [
          '200g spaghetti',
          '100g pancetta or guanciale',
          '2 large eggs',
          '50g pecorino romano cheese',
          '50g parmesan cheese',
          'Freshly ground black pepper',
          'Salt'
        ],
        instructions: [
          'Bring a large pot of salted water to boil and cook spaghetti al dente',
          'While pasta cooks, fry pancetta until crispy in a large pan',
          'In a bowl, whisk eggs with grated cheeses and black pepper',
          'Drain pasta, reserving some pasta water',
          'Add hot pasta to pancetta pan, remove from heat',
          'Quickly add egg mixture, stirring constantly',
          'Add pasta water as needed to create creamy sauce',
          'Serve immediately with extra cheese and pepper'
        ]
      },
      2: {
        ingredients: [
          '2 cups mixed vegetables (broccoli, bell peppers, carrots)',
          '2 tbsp vegetable oil',
          '2 cloves garlic, minced',
          '1 tbsp ginger, grated',
          '3 tbsp soy sauce',
          '1 tbsp oyster sauce',
          '1 tsp sesame oil',
          'Cooked rice for serving'
        ],
        instructions: [
          'Heat oil in a wok or large pan over high heat',
          'Add garlic and ginger, stir for 30 seconds',
          'Add vegetables and stir-fry for 3-4 minutes',
          'Add soy sauce and oyster sauce, toss to coat',
          'Cook for 2 more minutes until vegetables are crisp-tender',
          'Drizzle with sesame oil and serve over rice'
        ]
      },
      3: {
        ingredients: [
          '2 cups all-purpose flour',
          '2 cups sugar',
          '3/4 cup cocoa powder',
          '2 tsp baking soda',
          '1 tsp baking powder',
          '1 tsp salt',
          '2 large eggs',
          '1 cup buttermilk',
          '1 cup strong black coffee',
          '1/2 cup vegetable oil',
          '2 tsp vanilla extract'
        ],
        instructions: [
          'Preheat oven to 350°F (175°C) and prepare cake pans',
          'Mix dry ingredients in a large bowl',
          'In another bowl, mix eggs, buttermilk, coffee, oil, and vanilla',
          'Combine wet and dry ingredients, mix until smooth',
          'Pour into prepared pans and bake for 30-35 minutes',
          'Cool completely before frosting'
        ]
      },
      // Add details for other recipes...
    };
    return details[recipeId] || {
      ingredients: ['Ingredients not available'],
      instructions: ['Recipe instructions coming soon']
    };
  };

  const recipeDetails = getRecipeDetails(recipe.id);
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handleBackPress = () => {
    Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start(() => {
      navigation.goBack();
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        {!imageError ? (
          <Image 
            source={recipe.image} 
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : null}
        {imageError && (
          <View style={styles.fallbackImage}>
            <Ionicons name="image" size={60} color="#FFFFFF" />
            <Text style={styles.fallbackText}>Image not available</Text>
          </View>
        )}
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Recipe Title Overlay */}
        <View style={styles.titleOverlay}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.recipeCategory}>{recipe.category} • 4.8 ⭐</Text>
        </View>
      </View>

      {/* Recipe Content */}
      <View style={styles.content}>
        {/* Quick Info */}
        <View style={styles.quickInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color="#00BFFF" />
            <Text style={styles.infoText}>30 min</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="person" size={20} color="#00BFFF" />
            <Text style={styles.infoText}>4 servings</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flame" size={20} color="#00BFFF" />
            <Text style={styles.infoText}>Medium</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {recipe.desc}. This classic recipe has been perfected over generations and is sure to impress your guests with its authentic flavors and perfect texture.
        </Text>

        {/* Ingredients Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipeDetails.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Ionicons name="checkmark-circle" size={16} color="#FF69B4" style={styles.ingredientIcon} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Instructions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipeDetails.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        {/* Chef Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Chef's Notes</Text>
          <Text style={styles.notesText}>
            For best results, use fresh ingredients and follow the measurements precisely. 
            Don't skip the resting time for the dough if the recipe calls for it. 
            Remember to taste and adjust seasoning as you cook!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  recipeTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeCategory: {
    color: '#FF69B4',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    color: '#00BFFF',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: '#FF69B4',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00BFFF',
    paddingLeft: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
  },
  ingredientIcon: {
    marginRight: 10,
  },
  ingredientText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  notesSection: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  notesText: {
    color: '#FF69B4',
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});