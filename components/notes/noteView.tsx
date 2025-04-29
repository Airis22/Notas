import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { DataSource } from './dataSource';
import { Note } from './note';
import { NoteModal } from './noteModal';

export default function NotesView() {
    // Instancia del DataSource
    const dataSource = new DataSource();

    // Estado para la lista de notas
    const [notes, setNotes] = useState<Note[]>([]);

    // Estado para la nota en edición
    const [editNote, setEditNote] = useState<Note | null>(null);

    // Función para agregar una nueva nota
    //funcion para agregar una nueva nota la cual se manda a traer en el boton del modal el cual guarda la informacion en el modal 
    const handleAddNote = () => {
        setEditNote({
            id: 0,
            title: "",
            text: "",
            date: new Date(),
        });
    };

     const handleSaveNote = (note: Note) => {
        console.log("Guardar", note);
        // Aquí puedes hacer una petición a Supabase para guardar la nota
        dataSource.saveNote(note)
            .then((result) => {
                if (result === null) {
                    Alert.alert("no se gaurdo la nota");
                    return
                }
                //si la nota no se guardo 
                //si no actuliza 
                if (!note.id) {
                    setNotes([...notes, result]);

                } else {
                    setNotes(notes.map((item) => item.id === result.id ? result : item))
                    //cerrar modal
                    setEditNote(null);
                    //recorrer el elemneto y remplazar con el nuevo valor, 
                    //[1 , 2, 3, 4,]
                    //
                }
                    setEditNote(null)
            });

            setEditNote(null)
    };
 
/*     const handleSaveNote = async (note: Note) => {
        console.log("Guardar", note);
    
        try {
            const result = await dataSource.saveNote(note);
            if (!result) {
                Alert.alert("No se guardó la nota");
                return;
            }
    
            setNotes((prevNotes) => {
                if (note.id === 0) {
                    // Nueva nota: agregar a la lista
                    return [...prevNotes, result];
                } else {
                    // Nota existente: actualizar la lista
                    return prevNotes.map((item) =>
                        item.id === result.id ? result : item
                    );
                }
            });
    
            setEditNote(null);
        } catch (error) {
            console.error("Error al guardar la nota:", error);
        }
    }; */
    

    // Cargar notas desde la base de datos al montar el componente
    useEffect(() => {
        dataSource.getNotes().then((results) => {
            setNotes(results);
        })
    }, []);


    // Función para guardar la nota
    /*   const handleSaveNote = (note: Note) => {
          console.log("Guardar", note);
          setEditNote(null);
      }; */


    // Renderizar cada nota en la lista
    const renderNote = ({ item }: { item: Note }) => (
        <TouchableOpacity
            onPress={() => setEditNote(item)}
            onLongPress={() => handleDelete(item.id || 0)}
        >
            <View style={styles.noteContainer}>
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text style={styles.description}>Description: {item.text}</Text>
                <Text style={styles.date}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleDelete = (id: number) => {
        dataSource.deleteNote(id)
            .then((deleted) => {
                if (deleted) {
                    setNotes(notes.filter((item) => item.id !== id));
                    Alert.alert("La nota fue eliminada");
                }
            })
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id?.toString() || ""}
                renderItem={renderNote}
            />
            <View>
                <TouchableOpacity style={styles.button} onPress={handleAddNote}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>

                <NoteModal
                    note={editNote}
                    open={!!editNote}
                    onClose={() => setEditNote(null)}
                    onSave={handleSaveNote}
                />

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
    },
    noteContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ddd',
        
    },
    title: {
        fontFamily: "consolas",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#FFFFF',
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    button: {
        backgroundColor: "#dccaba",
        padding: 15,
        borderRadius: 130,
        marginTop: 20,
        marginLeft:"50%",
        right: 20,
        bottom: 20,
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#ddd',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        margin: 5
    }
});

