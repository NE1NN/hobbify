import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Defining the type for the props
type ToggleButtonProps = {
  label: string;
  onPress: (label: string) => void;
  isSelected: boolean;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selected : styles.notSelected]}
      onPress={() => onPress(label)}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // width: 'auto',
    flexBasis: '40%', // Adjust to fit two buttons per row
    paddingHorizontal: 40,
    paddingVertical:10,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 15
  },
  notSelected: {
    backgroundColor: '#1D4C4F',
  },
  selected: {
    backgroundColor: '#28B67E',
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default ToggleButton;
