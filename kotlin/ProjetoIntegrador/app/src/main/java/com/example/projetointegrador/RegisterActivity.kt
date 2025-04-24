package com.example.projetointegrador

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import okhttp3.*
import org.json.JSONObject
import java.io.IOException

class RegisterActivity : AppCompatActivity() {

    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val nome = findViewById<EditText>(R.id.editNome)
        val email = findViewById<EditText>(R.id.editEmail)
        val telefone = findViewById<EditText>(R.id.editTelefone)
        val cargo = findViewById<EditText>(R.id.editCargo)
        val senha = findViewById<EditText>(R.id.editSenha)
        val btnCadastrar = findViewById<Button>(R.id.btnCadastrar)

        btnCadastrar.setOnClickListener {
            val json = JSONObject().apply {
                put("nome", nome.text.toString())
                put("email", email.text.toString())
                put("telefone", telefone.text.toString())
                put("cargo", cargo.text.toString())
                put("senha", senha.text.toString())
            }

            val body = RequestBody.create(
                MediaType.get("application/json; charset=utf-8"),
                json.toString()
            )

            val request = Request.Builder()
                .url("http://10.0.2.2:3333/register") // use "10.0.2.2" no emulador Android para acessar o localhost
                .post(body)
                .build()

            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    runOnUiThread {
                        Toast.makeText(applicationContext, "Erro: ${e.message}", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onResponse(call: Call, response: Response) {
                    runOnUiThread {
                        if (response.isSuccessful) {
                            Toast.makeText(applicationContext, "Cadastro realizado!", Toast.LENGTH_SHORT).show()
                            finish() // fecha a activity se quiser voltar para login
                        } else {
                            Toast.makeText(applicationContext, "Erro ao cadastrar!", Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            })
        }
    }
}
