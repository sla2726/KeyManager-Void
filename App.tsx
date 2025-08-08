import './global.css';
import * as Updates from 'expo-updates';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { AlignJustify, Plus, Eye, EyeClosed, RefreshCw } from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import { servicesVerification } from './components/servicesVerification';

interface Keys {
  name: string;
  key: string;
  dist: string;
  date: string;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald: require('./assets/fonts/Oswald.ttf'),
  });

  // Senha
  const [keys, setKeys] = useState<Keys[]>([
    { name: 'Hello world', key: '123cool', dist: 'youtube', date: '2025' },
    { name: 'Helorld', key: '12ool', dist: 'Cona 1', date: '2025' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPass, setNewKeyPass] = useState('');
  const [newKeyDist, setNewKeyDist] = useState('');

  const [isAddKey, setIsAddKey] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [isPassDuplicate, setIsPassDuplicate] = useState(false);

  // Handlers

  const handleAddKey = () => {
    const validatedKey: Keys = {
      name: newKeyName,
      key: newKeyPass,
      dist: newKeyDist,
      date: new Date().toISOString(),
    };
    setKeys((prev) => [...prev, validatedKey]);
    setIsAddKey(false);
    setNewKeyName('');
    setNewKeyPass('');
    setNewKeyDist('');
    setIsPassDuplicate(false);
  };

  const formIsValid =
    newKeyName.trim() !== '' && newKeyPass.trim() !== '' && newKeyDist.trim() !== '';

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Erro ao recarregar o app:', error);
    }
  };

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
        <View className="bg-slate-800/60">
          {keys.map((key) => {
            const passwordDivided2 = Math.floor(key.key.length / 2);
            const passwordVisible = key.key.slice(0, passwordDivided2);
            const passwordOcult = '*'.repeat(key.key.length - passwordDivided2);
            const password = passwordVisible + passwordOcult;

            const service = servicesVerification(key.name);
            const IconService = (Icons as any)[service.icon];

            return (
              <View className="w-full border-b border-slate-400 py-2" key={key.key}>
                <View className="ml-4 flex flex-row">
                  {IconService && (
                    <View className="">
                      <IconService size={50} color={service.color} />
                    </View>
                  )}

                  <View className="ml-4">
                    <Text className="font-bold text-slate-100">{key.name}</Text>
                    <Text className="text-xs text-slate-100/40">{key.dist}</Text>
                    <Text className="text-slate-100">{password}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="relative z-20 flex h-10 w-full flex-row items-center justify-center bg-slate-800 ">
        <View className="absolute rounded-full bg-gray-600 px-2">
          <TouchableOpacity onPress={() => setIsAddKey((prev) => !prev)}>
            <Plus />
          </TouchableOpacity>
        </View>
        <View className="ml-auto rounded-full bg-gray-600 px-2">
          <TouchableOpacity onPress={reloadApp}>
            <RefreshCw />
          </TouchableOpacity>
        </View>
      </View>

      {isAddKey && (
        <TouchableWithoutFeedback onPress={() => setIsAddKey(false)}>
          <View className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
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
                  onChangeText={(text) => {
                    setNewKeyPass(text);
                    const isDuplicate = keys.some((item) => item.key === text);
                    setIsPassDuplicate(isDuplicate);
                  }}
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
                {isPassDuplicate && <Text className="text-red-500">Senha duplicada!</Text>}
                <TouchableOpacity
                  className={`mt-4 w-full rounded-full px-4 py-2 ${formIsValid ? 'bg-sky-600' : 'bg-gray-600'}`}
                  disabled={!formIsValid}
                  onPress={() => handleAddKey()}>
                  <Text className="text-slate-100">Adicionar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
