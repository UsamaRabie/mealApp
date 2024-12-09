import { FlatList , StyleSheet } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
function CategoriesScreen({navigation}) {

  function renderCategoryItem(itemData) {
    function pressHandler(){
      navigation.navigate("Meals Overview" , {
        categoryId : itemData.item.id
      })
  
    }
    return (
      <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} />
    );
  }

  
  return (

    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
      style={styles.container}
    />
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f2f25',
  },
});