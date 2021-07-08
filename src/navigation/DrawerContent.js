import React, {useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent({navigation}) {
  const [active, setActive] = useState('home');
  const {theme, toggleTheme} = usePreferences();

  const onChangeScreen = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          icon="home"
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChangeScreen('home')}
        />

        <Drawer.Item
          icon="star"
          label="Películas populares"
          active={active === 'popular'}
          onPress={() => onChangeScreen('popular')}
        />
        <Drawer.Item
          icon="movie"
          label="Nuevas Películas"
          active={active === 'news'}
          onPress={() => onChangeScreen('news')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Modo Oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
