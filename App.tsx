import './global.css';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { AlignJustify, Plus, Eye, EyeClosed } from 'lucide-react-native';

interface Keys {
  name: string;
  key: string | number;
  dist: string;
  date: string;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald: require('./assets/fonts/Oswald.ttf'),
  });

  // Senha
  const [keys, setKeys] = useState<Keys[]>([
    { name: 'Hello world', key: '123cool', dist: 'Conta 1', date: '2025' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPass, setNewKeyPass] = useState('');
  const [newKeyDist, setNewKeyDist] = useState('');

  const [isAddKey, setIsAddKey] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  // Handlers

  const handleAddKey = () => {
    const validatedKey: Keys = {
      name: newKeyName,
      key: newKeyPass,
      dist: newKeyDist,
      date: new Date().toISOString(),
    };
    setKeys((prev) => [...prev, validatedKey]);
  };

  const formIsValid = newKeyName.trim() !== '' && newKeyPass.trim() !== '' && newKeyDist.trim() !== ''
  
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

      <View className="relative z-20 flex h-10 w-full items-center justify-center bg-slate-800">
        <View className="rounded-full bg-gray-600 px-2">
          <TouchableOpacity onPress={() => setIsAddKey((prev) => !prev)}>
            <Plus />
          </TouchableOpacity>
        </View>
      </View>

      {isAddKey && (
        <View className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/50">
          <View className="flex w-3/4 flex-col items-center justify-center rounded-md border border-gray-500/60 bg-slate-900 px-4 py-2">
            <Text className="self-start text-slate-100">Título</Text>
            <TextInput
              className="w-full rounded-md bg-gray-700 px-2"
              onChangeText={setNewKeyName}
              value={newKeyName}
              placeholder="Senha do YouTube..."
              placeholderTextColor="gray"
            />
            <Text className="self-start text-slate-100">Local/Destino</Text>
            <TextInput
              className="w-full rounded-md bg-gray-700 px-2"
              onChangeText={setNewKeyDist}
              value={newKeyDist}
              placeholder="Conta user123..."
              placeholderTextColor="gray"
            />
            <Text className="self-start text-slate-100">Senha</Text>
            <TextInput
              className="w-full rounded-md bg-gray-700 px-2"
              onChangeText={setNewKeyPass}
              value={newKeyPass}
              placeholder="juninh987grau123..."
              placeholderTextColor="gray"
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              className="mt-1 self-start rounded-md bg-gray-600/40 px-4"
              onPress={() => setShowPassword((prev) => !prev)}>
              <View className="flex-row space-x-2">
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                <Text className="pl-2 text-gray-400/60">Exibir senha</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className={`mt-4 w-full rounded-full px-4 py-2 ${formIsValid ? 'bg-sky-600' : 'bg-gray-600'}`}
              disabled={!formIsValid}
              onPress={() => handleAddKey()}>
              <Text className="text-slate-100">Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
