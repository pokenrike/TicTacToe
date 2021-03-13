import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';


const initialState = ["500px", "500px", "500px", "500px", "500px", "500px", "500px", "500px", "500px"];
const initalPuntos = { x: 0, y: 0, player: 'x' }

export default function App() {
  const [board, setboard] = useState({ ...initialState })
  const [state, setState] = useState(true)
  const [ronda, setRonda] = useState(0)
  const [puntos, setPuntos] = useState({ ...initalPuntos })
  const Columna = memo(({ number }) => {
    return (
      <TouchableOpacity style={styles.rowCon} onPress={() => drawItem(number)}>
        <Entypo name={board[number]} size={32} color={chooseItemColor(number)} />
      </TouchableOpacity>
    )
  }, [])
  const Fila = memo(({ number }) => {

    const c1 = number;
    const c2 = number + 1;
    const c3 = number + 2;
    return (
      <View style={{ flexDirection: "row" }}>

        <Columna number={c1} />
        <Columna number={c2} />
        <Columna number={c3} />
      </View>
    )
  }
  )



  const chooseItemColor = (number) => {
    if (board[number] == "cross")
      return "#FF3031"
    else if (board[number] == "circle")
      return "#45CE30"

    return "#74B9FF"
  }

  const drawItem = (number) => {

    if (board[number] == "500px" && winGame() == "") {

      if (state) {
        board[number] = "cross"
        setboard(board)
      }
      else {
        board[number] = "circle"
        setboard(board)

      }
      setState(!state)
      setRonda(ronda + 1);
      if (winGame() != "") {
        setRonda(0);
        setboard({ ...initialState });
        if (winGame() === "cross")
          setPuntos({ ...puntos, x: puntos.x + 1, player: state ? 'y' : 'x' })
        else
          setPuntos({ ...puntos, y: puntos.y + 1, player: state ? 'y' : 'x' })
        setPlayer()
        Alert.alert(winGame() + " Gano el Juego")

      }
      else {
        if (ronda === 8) {
          setRonda(0);
          setboard({ ...initialState });
          setPuntos({ ...puntos, player: state ? 'y' : 'x' })
          Alert.alert('Empate');
          setPlayer()

        }
      }

    }


  }
  const setPlayer = () => {

    if (puntos.player === 'x')
      setState(true)
    else
      setState(false)
  }
  const winGame = () => {
    if (board[0] != "500px" && board[0] == board[1] && board[1] == board[2]) {
      return board[0]
    } else if (board[3] != "500px" && board[3] == board[4] && board[4] == board[5]) {
      return board[3]
    } else if (board[6] != "500px" && board[6] == board[7] && board[7] == board[8]) {
      return board[6]
    } else if (board[0] != "500px" && board[0] == board[3] && board[3] == board[6]) {
      return board[0]
    } else if (board[1] != "500px" && board[1] == board[4] && board[4] == board[7]) {
      return board[1]
    } else if (board[2] != "500px" && board[2] == board[5] && board[5] == board[8]) {
      return board[2]
    } else if (board[0] != "500px" && board[0] == board[4] && board[4] == board[8]) {
      return board[0]
    } else if (board[2] != "500px" && board[2] == board[4] && board[4] == board[6]) {
      return board[2]
    } else {
      return ""
    }
  }
  const resetGame = () => {
    setState(true)
    setRonda(0);
    setPuntos({ ...initalPuntos })
    setboard({ ...initialState });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}><MaterialIcons name="gamepad" size={24} color="white" /> Game</Text>
      <TouchableOpacity style={styles.score} >
        <Text style={styles.score}>Player O: {puntos.y} pts</Text>

        <Text style={styles.score}>Player X: {puntos.x} pts</Text>
      </TouchableOpacity>

      <Fila number={0} />
      <Fila number={3} />
      <Fila number={6} />

      <TouchableOpacity style={styles.btnRes} onPress={() => resetGame()}>
        <Entypo name="controller-jump-to-start" size={32} color="#2B2B52" />
        <Text style={{ color: "#2B2B52", fontSize: 20 }}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  score: {
    color: "white",
    fontSize: 25,
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  rowCon: { margin: 30, padding: 15 },
  btnRes: { margin: 30, flexDirection: "row", padding: 15, backgroundColor: "#74B9FF", width: 200, borderRadius: 20 },
  title: {
    color: "#4cff00", fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {

    paddingTop: 30,
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});