import { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const favoriteMeals = useSelector((state)=>state.favoriteMeals.ids)

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const mealsFavorite = favoriteMeals.includes(mealId);
  const dispatch = useDispatch()

  function changeFavoriteMeals() {
  if(mealsFavorite){
    dispatch(removeFavorite({id:mealId}))
  }else{
    dispatch(addFavorite({id:mealId}))

  }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
          icon={mealsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoriteMeals}
          />
        );
      },
    });
  }, [navigation, changeFavoriteMeals]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    paddingBottom: 64,
    backgroundColor: '#3f2f25',

  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
    paddingBottom:"32px",
  },
  listContainer: {
    width: '80%',
  },
});