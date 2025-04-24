package com.seuprojeto

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import java.io.IOException

class FeedActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_feed)

        // Botão para ir para a tela de criação de post
        val btnCriarPost = findViewById<Button>(R.id.btnCriarPost)
        btnCriarPost.setOnClickListener {
            val intent = Intent(this, CreatePostActivity::class.java)
            startActivity(intent)
        }

        // Chamada GET para carregar os posts
        carregarPosts()
    }

    private fun carregarPosts() {
        val request = Request.Builder()
            .url("http://10.0.2.2:3333/posts") // localhost no emulador Android
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("FeedActivity", "Erro ao carregar posts: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    val body = response.body?.string()
                    Log.d("FeedActivity", "Resposta dos posts: $body")
                    // Aqui você pode fazer o parse do JSON e atualizar a UI com runOnUiThread
                } else {
                    Log.e("FeedActivity", "Falha na resposta: ${response.code}")
                }
            }
        })
    }
}
