import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import nba from '../../services/api/nba';

const Administrador = ({navigation}) => {


    const [results, setResults] = useState([]);

    const chamaApi = async () => {
        const {data} = await nba.request();
        console.log(data.data);
        setResults(data.data);
    }

    const dadosTime = time => {
        console.log(time);
    }

    useEffect(() => {
        chamaApi();
    }, []);

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>NBA TIMES</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Inseridos')}>
                <Text style={styles.text}>Times Inseridos</Text>
            </TouchableOpacity>
            <FlatList 
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Time', {data: item})}>
                                <Text style={styles.abbv}>{item.abbreviation}</Text>
                                <Text>{item.full_name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 800,
        color: '#00308F'
    },
    card: {
        backgroundColor: '#00308F1D',
        marginVertical: 10,
        width: 300,
        height: 60,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },
    btn: {
        width: 200,
        height: 40,
        backgroundColor: '#00308F',
        padding: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 12,
    },
})

export default Administrador;