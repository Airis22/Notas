/* import { Modal, StyleSheet, Text, TextInputComponent, TouchableOpacity, View } from "react-native";
import { Note } from "./note";

import { useState } from "react";

type Props = {
    note: Note | null;
    open: boolean,
    onSave: (note:Note) => void;
    onClose: () => void;
} */

/* export function NoteModal({
    note,
    open,
    onSave,
    onClose
} : Props ) {

    const[title, setTitle] = useState('');
    const[text, setText] = useState('');

    const handleSave =() => {
        if (!note) return;
        onSave({
            ...note,
            title,
            text,
        });

    } */
    /* return(
              <View>
                <Modal 
                style={styles.modal}
                animationType='slide'
                transparent = {true}
               /*  visible={modalVisible}
                onRequestClose={() =>setModalVisible(false)} */
                /* >
                    <Text>Ingresa algo</Text>
                    <TextInputComponent></TextInputComponent>
        
                <TouchableOpacity style={styles.buttons}>
                    <Text>Cerrar</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.buttons}>
                    <Text>Guardar</Text>
                </TouchableOpacity>
        
        
                </Modal>
              </View>
    )
}  */
/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noteContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  button: {

  },
  modal:{
    backgroundColor: "green",
    height: "80%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",

  },
  buttons: {
    borderRadius: 20,
    backgroundColor: "brown",
    color: "white"
  }
}) */

import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Note } from "./note";

type Props = {
    note: Note | null;
    open: boolean;
    onSave: (note: Note) => void;
    onClose: () => void;
};

export function NoteModal({ 
    note, 
    open, 
    onSave, 
    onClose }: Props) {

    const [title, setTitle] = useState(note?.title || '');
    const [text, setText] = useState(note?.text || '');

    const handleSave = () => {
        if (!note) return;
        onSave({ 
            ...note, 
            title, 
            text });
/*         onClose(); */
    };

    //cada vez qie cambie reiniciar las cajas de texto
    useEffect(() => {
        setTitle(note?.title || "");
        setText(note?.text || "");

    }, [note]);


    return (
        
        <Modal 
        animationType="fade"
         transparent={true} 
         visible={open}
         onRequestClose={onClose}>
            
            <View style={styles.modal}>

                <View style={styles.modalContent}>
                <Text style={styles.titulo}>Agrega tu nueva nota</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Título"
                />
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Descripción"
                    multiline
                />
                <View style={styles.row}>
                <TouchableOpacity style={styles.buttons} onPress={onClose}>
                    <Text style={styles.textButton}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={handleSave}>
                    <Text style={styles.textButton}>Guardar</Text>
                    
                </TouchableOpacity>
                </View>
                </View>
            </View>
        </Modal>
      
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        backgroundColor: "#baa27e",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    titulo:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        fontFamily: "consolas"
    },
    input: {
        width: "80%",
        borderBottomWidth: 2,
        borderColor: "#fff",
        marginBottom: 10,
        padding: 10,
        color: "#fff",
    },
    row:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    buttons: {
        borderRadius: 20,
        backgroundColor: "#d0ba80",
        padding: 10,
        marginTop: 10,
        margin: 5,
    },
    textButton:{
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        fontFamily: "consolas"
    },
});
