import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const recipes = [
  { 
    id: 1, 
    title: 'Pasta Carbonara', 
    image: require('./assets/pasta.jpg'), 
    desc: 'Creamy Italian pasta with eggs and pancetta', 
    category: 'Italian',
    prepTime: '15 min',
    cookTime: '15 min',
    difficulty: 'Medium'
  },
  { 
    id: 2, 
    title: 'Veggie Stir Fry', 
    image: require('./assets/vig.jpg'), 
    desc: 'Quick and healthy vegetable stir fry', 
    category: 'Asian',
    prepTime: '10 min',
    cookTime: '10 min',
    difficulty: 'Easy'
  },
  { 
    id: 3, 
    title: 'Chocolate Cake', 
    image: require('./assets/choc.jpg'), 
    desc: 'Rich and decadent chocolate dessert', 
    category: 'Desserts',
    prepTime: '20 min',
    cookTime: '30 min',
    difficulty: 'Medium'
  },
  { 
    id: 4, 
    title: 'Grilled Chicken', 
    image: require('./assets/chick.jpg'), 
    desc: 'Perfectly grilled chicken with herbs', 
    category: 'Healthy',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Easy'
  },
  { 
    id: 5, 
    title: 'Salad Bowl', 
    image: require('./assets/salad.jpg'), 
    desc: 'Fresh mixed greens with dressing', 
    category: 'Healthy',
    prepTime: '5 min',
    cookTime: '0 min',
    difficulty: 'Easy'
  },
  { 
    id: 6, 
    title: 'Classic Burger', 
    image: require('./assets/burger.jpg'), 
    desc: 'Juicy beef patty with fresh toppings', 
    category: 'American',
    prepTime: '15 min',
    cookTime: '10 min',
    difficulty: 'Easy'
  },
  { 
    id: 7, 
    title: 'Sushi Rolls', 
    image: require('./assets/sushi.jpg'), 
    desc: 'Fresh fish and perfectly cooked rice', 
    category: 'Asian',
    prepTime: '30 min',
    cookTime: '0 min',
    difficulty: 'Hard'
  },
  { 
    id: 8, 
    title: 'Pizza Margherita', 
    image: require('./assets/pizza.jpg'), 
    desc: 'Classic tomato and basil pizza', 
    category: 'Italian',
    prepTime: '20 min',
    cookTime: '15 min',
    difficulty: 'Medium'
  },
  { 
    id: 9, 
    title: 'Tacos', 
    image: require('./assets/tacos.jpg'), 
    desc: 'Spicy Mexican street-style tacos', 
    category: 'Mexican',
    prepTime: '20 min',
    cookTime: '10 min',
    difficulty: 'Medium'
  },
  { 
    id: 10, 
    title: 'Fruit Smoothie', 
    image: require('./assets/smoothie.jpg'), 
    desc: 'Refreshing blended fruit drink', 
    category: 'Healthy',
    prepTime: '5 min',
    cookTime: '0 min',
    difficulty: 'Easy'
  },
];

function RecipeCard({ item, onPress }) {
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
              <Ionicons name="image" size={40} color="#FFFFFF" />
              <Text style={styles.fallbackText}>Image not available</Text>
            </View>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={14} color="#00BFFF" />
              <Text style={styles.metaText}>{item.prepTime} prep</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="restaurant" size={14} color="#00BFFF" />
              <Text style={styles.metaText}>{item.cookTime} cook</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="speedometer" size={14} color="#00BFFF" />
              <Text style={styles.metaText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderRecipe = ({ item }) => (
    <RecipeCard 
      item={item} 
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Featured Recipes</Text>
        <Text style={styles.headerSubtitle}>Discover recipes</Text>
      </View>
      
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    color: '#00BFFF',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FF69B4',
    textAlign: 'center'
  },
  list: {
    padding: 15,
    paddingTop: 0,
  },
  recipeCard: {
    backgroundColor: '#1e1e1e',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
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
    marginTop: 8,
    fontSize: 12,
  },
  categoryBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#00BFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    color: '#FF69B4',
    marginBottom: 15,
    fontSize: 14,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    color: '#00BFFF',
    fontSize: 12,
    marginLeft: 5,
  },
});