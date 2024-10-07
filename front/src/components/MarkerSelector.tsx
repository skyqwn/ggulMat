import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomMarker from './CustomMarker';

interface MarkerSelectorProps {}

function MarkerSelector({}: MarkerSelectorProps) {
  return (
    <View>
      {['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'].map(color => {
        return (
          <Pressable>
            <CustomMarker color={color} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

export default MarkerSelector;
