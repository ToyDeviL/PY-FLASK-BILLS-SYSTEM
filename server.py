from flask import Flask, render_template, request, redirect, url_for, session
import psycopg2

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Adicione uma chave secreta para a sessão

# Configuração do banco de dados PostgreSQL
def get_db_connection():
    return psycopg2.connect(
        dbname="contas",
        user="andrino",
        password="Rebecca@2023",
        host="localhost"
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Simulação de autenticação (substituir com consulta ao banco)
        if username == "andrino" and password == "Rebecca@2023":
            session['username'] = username
            return redirect(url_for('dashboard'))
        
        return "Credenciais inválidas", 401

    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('dashboard.html')
    return redirect(url_for('login'))

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)  # Remove o nome de usuário da sessão
    return redirect(url_for('login'))

@app.route('/add_expense', methods=['GET', 'POST'])
def add_expense():
    if request.method == 'POST':
        category = request.form['category']
        date = request.form['date']
        description = request.form['description']
        amount = request.form['amount']
        recurring = 'recurring' in request.form

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "INSERT INTO expenses (category, date, description, amount, recurring) VALUES (%s, %s, %s, %s, %s)",
            (category, date, description, amount, recurring)
        )
        conn.commit()

        cur.close()
        conn.close()

        return redirect(url_for('dashboard'))
    return render_template('add_expense.html')

@app.errorhandler(500)
def internal_error(error):
    return f"500 error: {error}", 500

if __name__ == '__main__':
    app.run(host='192.168.100.100', port=5000, debug=True)
