package com.seuapp //Trocarparaonossopacote

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.seuapp.model.LoginRequest
import com.seuapp.model.LoginResponse
import com.seuapp.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val emailEditText = findViewById<EditText>(R.id.emailEditText)
    val senhaEditText = findViewById<EditText>(R.id.senhaEditText)
    val loginButton = findViewById<Button>(R.id.loginButton)

    loginButton.setOnClickListener {
        val email = emailEditText.text.toString()
        val senha = senhaEditText.text.toString()

        if (email.isNotBlank() && senha.isNotBlank()) {
            fazerLogin(email, senha)
        } else {
            Toast.makeText(this, "Preencha todos os campos", Toast.LENGTH_SHORT).show()
        }
    }
}

private fun fazerLogin(email: String, senha: String) {
    val request = LoginRequest(email, senha)

    RetrofitClient.apiService.login(request).enqueue(object : Callback<LoginResponse> {
    override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
    if (response.isSuccessful && response.body()?.sucesso == true) {
    Toast.makeText(this@MainActivity, "Login bem-sucedido!", Toast.LENGTH_SHORT).show()
    // Redirecionar para a tela inicial
    val intent = Intent(this@MainActivity, ***TelaInicialActivity***::class.java)
    startActivity(intent)
    finish() // opcional: impede de voltar ao login com o botão de voltar
    } else {
    Toast.makeText(this@MainActivity, "Login falhou: ${response.body()?.mensagem ?: "Erro desconhecido"}", Toast.LENGTH_SHORT).show()
    }
    }

    override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
    Toast.makeText(this@MainActivity, "Erro na conexão: ${t.message}", Toast.LENGTH_SHORT).show()
    }
    })
    }
}