import './global.css';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { AlignJustify, Plus } from 'lucide-react-native';

interface Keys {
  name: string;
  key: string | number;
  date: string;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald: require('./assets/fonts/Oswald.ttf'),
  });

  // Senha
  const [keys, setKeys] = useState<Keys[]>([{ name: 'Hello world', key: '123cool', date: '2025' }]);
  const [newKey, setNewKey] = useState('');

  const [isAddKey, setIsAddKey] = useState(false);

  // Handlers

  /* const handleAddKey = () => {
    const validatedKey: Keys = {
      name: 
    }
    setKeys((prev) => [...prev, newKey] )
  } */

  if (!fontsLoaded) return null;

  return (
    <View className="relative h-full w-full bg-slate-900">
      <SafeAreaView className="relative flex h-16 w-full items-center justify-center bg-slate-800">
        <View className="absolute left-2">
          <Text className="font-bold">
            <AlignJustify color="white" />
          </Text>
        </View>

        <Text className="font-bold text-white">Key Manager</Text>
      </SafeAreaView>

      <ScrollView className="flex flex-col">
        <View className="bg-gray-700">
          {keys.map((key) => (
            <View key={key.key}>
              <Text>{key.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="relative flex h-10 w-full items-center justify-center bg-slate-800 z-20">
        <View className="bg-gray-600 px-2 rounded-full">
          <TouchableOpacity onPress={() => setIsAddKey((prev) => !prev)}>
            <Plus />
          </TouchableOpacity>
        </View>
      </View>

      {isAddKey && (
        <View className="absolute flex items-center justify-center inset-0 w-full bg-black/50 z-10">
          <View className="flex bg-gray-800 px-4 py-2 rounded-md border border-gray-500/60 flex-col w-3/4 items-center justify-center">
            <Text className="text-white">Título</Text>
            <TextInput
              className="bg-gray-700 rounded-md w-3/4"
              onChangeText={setNewKey}
              value={newKey}
              placeholder="Senha do YouTube..."
              placeholderTextColor="white"
            />
            <Text className="text-white">Local/Destino</Text>
            <TextInput
              className="bg-gray-700 rounded-md w-3/4"
              onChangeText={setNewKey}
              value={newKey}
              placeholder="Conta user123..."
              placeholderTextColor="white"
            />
            <Text className="text-white">Senha</Text>
            <TextInput
              className="bg-gray-700 rounded-md w-3/4"
              onChangeText={setNewKey}
              value={newKey}
              placeholder="juninh987grau123..."
              placeholderTextColor="white"
            />
          </View>
        </View>
      )}
    </View>
  );
}
