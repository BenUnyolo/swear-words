export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          choice_1: number
          choice_2: number
          created_at: string
          id: number
          winner: number
        }
        Insert: {
          choice_1: number
          choice_2: number
          created_at?: string
          id?: number
          winner: number
        }
        Update: {
          choice_1?: number
          choice_2?: number
          created_at?: string
          id?: number
          winner?: number
        }
        Relationships: [
          {
            foreignKeyName: "matches_choice_1_fkey"
            columns: ["choice_1"]
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_choice_2_fkey"
            columns: ["choice_2"]
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_fkey"
            columns: ["winner"]
            referencedRelation: "words"
            referencedColumns: ["id"]
          }
        ]
      }
      words: {
        Row: {
          id: number
          losses: number
          rating: number
          wins: number
          word: string
        }
        Insert: {
          id?: number
          losses?: number
          rating?: number
          wins?: number
          word: string
        }
        Update: {
          id?: number
          losses?: number
          rating?: number
          wins?: number
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
