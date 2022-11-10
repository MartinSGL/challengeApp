import React, { useEffect, useState } from "react";
import { View, RefreshControl } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import photoAPI from "../api/photoApi";
import { PhotoRes } from "../interfaces/photosInterface";
import  { PhotoItem } from '../components/PhotoItem';

const MyPhotosScreen = () => {
  const [photos, setPhotos] = useState<PhotoRes[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    // getData from API
    getData()
  }, [])

  const getData = async () =>{
    setRefreshing(true)
    const res = await photoAPI.get('/photos')
    if(res){
      setPhotos(res.data)
      setRefreshing(false)
    }
  }

  const handleDelete = (index:any) =>{
    const arr = [...photos]
    arr.splice(index,1)
    setPhotos(arr)
  } 

  return (
      <DraggableFlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={getData}
            progressBackgroundColor='gray'
            // colors={['red','blue','cyan']}
          // style = {{backgroundColor: 'yellow'}}
          // tintColor = 'red'
        />
        }
        data={photos}
        onDragEnd={({ data }) => setPhotos(data)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item,index,drag,isActive}) =>
          <PhotoItem item={item} drag={drag} isActive={isActive} handleDelete={()=>handleDelete(index)} />
        }
      />  
  );
}


export default MyPhotosScreen


