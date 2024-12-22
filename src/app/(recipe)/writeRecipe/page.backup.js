'use client'

import { useState, useCallback } from 'react'
import { recipesApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import RecipeIngredients from '@/components/recipeIngredients/RecipeIngredients'
import UploadImage from '@/components/uploadImage/UploadImage'
import styles from './writeRecipe.module.css'

export default function WriteRecipePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [{ name: '', amount: '', unit: '' }],
        steps: '',
        image: '',
        cookingTime: '',
        servings: '',
        difficulty: 'easy',
        authorId: 1,
        categoryId: 4
    });

    // ... 保留所有原有代码 ...
} 