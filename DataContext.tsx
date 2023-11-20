import { View, Text } from 'react-native'
import React, { createContext } from 'react'
import { useContext } from 'react'

const DataContext = () => createContext(null)

export default DataContext