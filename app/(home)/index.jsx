import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect, React, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

function LogoTitle({ user }) {
  console.log(user.avatar_url);
  const [isAvatarActive, setIsAvatarActive] = useState(true);
  console.log("USER", user);

  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { borderColor: setIsAvatarActive ? "#4cc4c2" : "#19918F" },
      ]}
      onPress={() => setIsAvatarActive((prev) => !prev)}
      activeOpacity={0.8}
    >
      <Image style={styles.image} source={{ uri: user?.avatar_url }} />
    </TouchableOpacity>
  );
}

// const transactions = [
//   {
//     id: 1,
//     date: '17 December 2024',
//     amount: '75.000',
//     name: 'Putri Afia',
//     type: 'Transfer Uang Bis',
//     debit: false,
//   },
//   {
//     id: 2,
//     date: '18 December 2024',
//     amount: '80.000',
//     name: 'Kopi 2 Go',
//     type: 'Transfer',
//     debit: true,
//   },
//   {
//     id: 3,
//     date: '19 December 2024',
//     amount: '600.000',
//     name: 'Zana',
//     type: 'Transfer',
//     debit: false,
//   },
//   {
//     id: 4,
//     date: '20 December 2024',
//     amount: '80.000',
//     name: 'Kopi Tuku',
//     type: 'Transfer',
//     debit: true,
//   },
//   {
//     id: 5,
//     date: '21 December 2024',
//     amount: '1.000.000',
//     name: 'Salma',
//     type: 'Transfer',
//     debit: false,
//   },
//   {
//     id: 6,
//     date: '22 December 2024',
//     amount: '80.000',
//     name: 'Shopee',
//     type: 'Transfer',
//     debit: true,
//   },
//   {
//     id: 7,
//     date: '23 December 2024',
//     amount: '600.000',
//     name: 'Salma',
//     type: 'Transfer',
//     debit: false,
//   },
//   {
//     id: 8,
//     date: '24 December 2024',
//     amount: '80.000',
//     name: 'Shopee',
//     type: 'Transfer',
//     debit: true,
//   },
//   {
//     id: 9,
//     date: '25 December 2024',
//     amount: '600.000',
//     name: 'Salma',
//     type: 'Transfer',
//     debit: false,
//   },
// ]

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState({});
  const [transactions, setTransaction] = useState([])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTransaction()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [user, setUser] = useState({
    fullname: "",
    id: "",
    username: "",
    email: "",
    wallet: { account_number: "", balance: "" },
  })
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        console.log(value, ' token')
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/profile",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const user = res.data.data
          console.log(user)
          setUser(user)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [refreshing]);
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/transactions",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const transaction = res.data.data
          setTransaction(transaction)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTransaction();
  }, [refreshing]);

  return (
    <ScrollView containerStyle={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <LogoTitle user={user} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user?.fullname}</Text>
            <Text style={{ fontSize: 18 }}>{user.fullname}</Text>
          </View>
        </View>
        <Image source={require('../../assets/suntoggle.png')} />
      </View>
      <View style={{ backgroundColor: '#FAFBFD', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 25, justifyContent: 'space-between' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Good Morning, {user?.fullname && user.fullname.split(' ')[0]}</Text>
            <Text style={{ fontSize: 18 }}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={require('../../assets/sun.png')} style={{ width: 81, height: 77 }} />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{user.wallet?.account_number}</Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ fontSize: 20 }}>Balance</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{showBalance ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user?.wallet.balance || 0)
              : "Rp *"}
              <TouchableOpacity onPress={() => setShowBalance((prev) => !prev)}>
                <Image source={require('../../assets/view.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
              </TouchableOpacity>
            </Text>
          </View>

          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome6 size={18} name="add" color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome size={18} name="send" color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginTop: 40, borderRadius: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5, }}>Transaction History</Text>
          {transactions?.map((tx) => (
            <View key={transactions?.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 }}>
              <View>
                <Text style={{ fontSize: 19 }}>{user?.fullname}</Text>
                <Text style={{ fontSize: 16 }}>{tx?.transaction_type}</Text>
                <Text style={{ fontSize: 14, color: '#b3b3b3' }}>{tx?.transaction_date}</Text>
              </View>
              <Text style={{ fontSize: 18, color: tx?.transaction_type === "transfer" ? 'red' : 'green' }}>{tx?.transaction_type === "transfer" ? '-' : '+'}  Rp {tx.amount}</Text>
            </View> 
          ))}
        </ScrollView>


      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  balancebox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1
  },
  image: {
    borderRadius: 999,
    width: 50,
    height: 50,
  },
});