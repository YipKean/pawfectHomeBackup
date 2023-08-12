import React, { useState, useEffect } from 'react';
import { BackHandler, View, Alert, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Color, FontFamily } from "../GlobalStyles";
import { Header } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import { fetchUserDetails} from '../components/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextStroke from '../components/TextStroke';
import { SERVER_ADDRESS } from '../config'; 

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const PetListingActiveScreen = () => {
    const [userDetails, setUserDetails] = useState(null);
    const navigation = useNavigation();
    const [listingDetails, setListingDetails] = useState(null);
    const [reloadList, setReloadList] = useState(false); // State variable for triggering reload

    function getAgeFromDate(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

        return `${years}y ${months}m`;
    }

    useEffect(() => {
        // Handle the back button press event
        const handleBackPress = () => {
          navigation.goBack(); // Exit the app
          return true; // Prevent default behavior
        };
    
        // Add the event listener
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        // Return a cleanup function to remove the event listener
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, []);

    const getActiveListing = async () => {
        if (userDetails) {
            const userID = userDetails.user.userID;

            const token = await AsyncStorage.getItem('token'); // Retrieve token

            fetch(`${SERVER_ADDRESS}/api/listings/active?userID=${userID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((listings) => {
                    setListingDetails(listings);
                })
                .catch((error) => {
                    console.error('AAAAA' + error);
                });

        }
    };
    useEffect(() => {
        fetchUserDetails(setUserDetails);
    }, []);

    useEffect(() => {
        // Add focus listener
        const unsubscribe = navigation.addListener('focus', () => {
          getActiveListing();
        });
    
        getActiveListing();
    
        // Clean up the listener when the component is unmounted
        return unsubscribe;
      }, [userDetails]);

    const renderItem = ({ item }) => {
        const imageUrl = `${SERVER_ADDRESS}/api/pets/pet_image/${item.pet.pet_photo}`; // Fetch pet details from pet object
        const petAge = getAgeFromDate(item.pet.pet_age);  // Fetch pet details from pet object

        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("PetListingDetails", { listingID: item.listing.listingID, petAge: petAge })}  // Pass the listing ID
            >
                <Image source={{ uri: imageUrl }} style={styles.itemImage} />
                <View style={styles.itemTextContainer}>
                <TextStroke stroke="#533e41" strokeWidth={0.3} style={[styles.itemText, { color: Color.sandybrown, fontSize: 15, fontWeight: '800',marginBottom: '60%' }]}>{item.listing.listing_type} </TextStroke >
                    <TextStroke stroke="#533e41" strokeWidth={0.3} style={[styles.itemText, { fontSize: 19, fontWeight: '800' }]}>{item.pet.pet_name}</TextStroke >
                    <TextStroke stroke="#533e41" strokeWidth={0.1} style={styles.itemText}>{item.pet.pet_breed}</TextStroke>
                    <TextStroke stroke="#533e41" strokeWidth={0.1} style={styles.itemText}>{petAge} {item.pet.pet_gender}</TextStroke>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={listingDetails}
                renderItem={renderItem}
                keyExtractor={(item) => item.listing.listingID.toString()}
                numColumns={2}
                extraData={reloadList}
            />
            <FloatingAction
                color='#FF9E5C'
                showBackground={false}
                onPressMain={() => {
                    navigation.navigate("CreateListing")
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: windowHeight * 0.03
    },
    backButton: {
        marginTop: windowHeight * 0.03,
        width: windowHeight * 0.05,
        height: windowHeight * 0.05,
        borderRadius: 20,
        backgroundColor: '#FF9E5C',
        alignItems: "center",
    },
    backButtonText: {
        paddingTop: windowHeight * 0.004,
        fontSize: 24,
        color: Color.dimgray,
        fontWeight: "700",
    },
    categories: {
        alignSelf: 'flex-start',
        fontSize: 25,
        letterSpacing: 0.7,
        color: Color.dimgray,
        fontWeight: '900',
    },
    itemTextContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: windowWidth * 0.05,
        marginBottom: windowHeight * 0.02
    },
    itemText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 13,
    },
    categoriesContainer: {
        marginVertical: windowHeight * 0.01,
        width: windowWidth * 0.9,
    },
    button: {
        backgroundColor: 'white',
        height: windowHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: windowWidth * 0.04,
        paddingVertical: 20,
        borderRadius: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.9, // was 0.8
        marginBottom: windowHeight * 0.03,
    },
    searchInput: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 40,
        width: '100%',
        height: windowHeight * 0.06,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    item: {
        height: windowHeight * 0.25,
        width: windowWidth * 0.42,
        marginBottom: windowWidth * 0.045,
        marginLeft: windowWidth * 0.03,
        marginRight: windowWidth * 0.03,
        borderRadius: 30,
        overflow: 'hidden', // Add this line
    },
    itemImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    searchContainer: {
        width: windowWidth * 0.9,
        alignItems: 'center',
    },

    titleText: {
        marginVertical: windowHeight * 0.024,
        fontSize: 33,
        letterSpacing: 0.4,
        color: Color.sandybrown,
        fontWeight: '900',
    },
});

export default PetListingActiveScreen;