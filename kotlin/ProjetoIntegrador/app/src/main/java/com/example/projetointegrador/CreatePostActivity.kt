package com.example.projetointegrador

import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import okhttp3.*
import org.json.JSONObject
import java.io.IOException

class CreatePostActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_create_post)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val titulo = findViewById<EditText>(R.id.edit_titulo)
        val descricao = findViewById<EditText>(R.id.edit_descricao)
        val endereco = findViewById<EditText>(R.id.edit_endereco)
        val btnPostar = findViewById<Button>(R.id.btn_postar)
        val btnCancelar = findViewById<Button>(R.id.btn_cancelar)

        btnPostar.setOnClickListener {
            val tituloStr = titulo.text.toString().trim()
            val descricaoStr = descricao.text.toString().trim()
            val enderecoStr = endereco.text.toString().trim()

            if (tituloStr.isEmpty() || descricaoStr.isEmpty() || enderecoStr.isEmpty()) {
                Toast.makeText(this, "Preencha todos os campos obrigatórios", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val json = JSONObject().apply {
                put("titulo", tituloStr)
                put("descricao", descricaoStr)
                put("endereco", enderecoStr)
            }

            val body = RequestBody.create(
                MediaType.parse("application/json; charset=utf-8"),
                json.toString()
            )

            val request = Request.Builder()
                .url("http://10.0.2.2:3333/posts")
                .post(body)
                .build()

            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    runOnUiThread {
                        Toast.makeText(this@CreatePostActivity, "Erro ao enviar post", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onResponse(call: Call, response: Response) {
                    runOnUiThread {
                        if (response.isSuccessful) {
                            Toast.makeText(this@CreatePostActivity, "Post criado com sucesso!", Toast.LENGTH_SHORT).show()
                            startActivity(Intent(this@CreatePostActivity, FeedActivity::class.java))
                            finish()
                        } else {
                            Toast.makeText(this@CreatePostActivity, "Erro ao criar post: ${response.code()}", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            })
        }

        btnCancelar.setOnClickListener {
            finish()
        }
    }
}
