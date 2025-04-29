import { supabase } from "@/lib/supabase";
import { Note } from "./note";

export class DataSource{
    constructor() {
    }
    async getNotes():
    Promise<Note[]>{
        let {data: notes, error} = await supabase
        .from('notas')
        .select('*');

        return notes?.map((item) => ({ 
            ...item,
            date: new Date(item.date) 
        })) || [];
    }

    async saveNote(note: Note) : Promise<Note | null > { 
        //upseet: si existe lo actualiza si no existe lo inserta 
        const { data, error } = await supabase
        .from('notas')
        .upsert(note)
        .select();
        if (data){
            const saved = data[0];
            return{
                ...saved,
                date: new Date(saved.date)
            }
        }
        return !!data ? data[0] : null;
        //si data tiene valor agregarlo si no el valor debe  ser diferente de cero
    }
    async deleteNote (id: number) : Promise<boolean> {
        
        const { error } = await supabase
        .from('notas')
        .delete()
        .eq('id', id)
        return !error;
    }

}

