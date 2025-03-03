from flask import Flask, render_template, request, redirect, url_for, session, jsonify
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
        descricao = request.form['descricao']
        categoria = request.form['categoria']
        valor_total = request.form['valor_total']
        parcelas = request.form['parcelas']
        parcelas_pagas = request.form['parcelas_pagas']
        data_inicio = request.form['data_inicio']
        recorrente = 'recorrente' in request.form
        observacoes = request.form['observacoes']
        metodo_pagamento = request.form['metodo_pagamento']

        conn = get_db_connection()
        cur = conn.cursor()

        try:
            cur.execute(
                "INSERT INTO contas (descricao, categoria, valor_total, parcelas, parcelas_pagas, data_inicio, recorrente, observacoes, metodo_pagamento) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (descricao, categoria, valor_total, parcelas, parcelas_pagas, data_inicio, recorrente, observacoes, metodo_pagamento)
            )
            conn.commit()
            response = jsonify(success=True, message="Despesa adicionada com sucesso!")
        except Exception as e:
            response = jsonify(success=False, message=str(e))
        finally:
            cur.close()
            conn.close()

        return response

    return render_template('add_expense_content.html')

@app.route('/add_income', methods=['GET', 'POST'])
def add_income():
    if request.method == 'POST':
        amount = request.form['amount']
        income_type = request.form['income_type']
        description = request.form['description']
        month = request.form['month']
        year = request.form['year']
        recurring = 'recurring' in request.form

        conn = get_db_connection()
        cur = conn.cursor()

        try:
            cur.execute(
                "INSERT INTO incomes (amount, income_type, description, month, year, recurring) VALUES (%s, %s, %s, %s, %s, %s)",
                (amount, income_type, description, month, year, recurring)
            )
            conn.commit()
            response = jsonify(success=True, message="Provento adicionado com sucesso!")
        except Exception as e:
            response = jsonify(success=False, message=str(e))
        finally:
            cur.close()
            conn.close()

        return response

    return render_template('add_income_content.html')

@app.route('/view_expenses')
def view_expenses():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT descricao, categoria, valor_total, parcelas, parcelas_pagas, data_inicio, recorrente, observacoes, metodo_pagamento, id FROM contas")
    expenses = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('view_expenses_content.html', expenses=expenses)

@app.route('/view_incomes')
def view_incomes():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT amount, income_type, description, month, year, recurring, id FROM incomes")
    incomes = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('view_incomes_content.html', incomes=incomes)

@app.route('/edit_expense', methods=['POST'])
def edit_expense():
    id = request.form['id']
    descricao = request.form['descricao']
    categoria = request.form['categoria']
    valor_total = request.form['valor_total']
    parcelas = request.form['parcelas']
    parcelas_pagas = request.form['parcelas_pagas']
    data_inicio = request.form['data_inicio']
    recorrente = 'recorrente' in request.form
    observacoes = request.form['observacoes']
    metodo_pagamento = request.form['metodo_pagamento']

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "UPDATE contas SET descricao = %s, categoria = %s, valor_total = %s, parcelas = %s, parcelas_pagas = %s, data_inicio = %s, recorrente = %s, observacoes = %s, metodo_pagamento = %s WHERE id = %s",
            (descricao, categoria, valor_total, parcelas, parcelas_pagas, data_inicio, recorrente, observacoes, metodo_pagamento, id)
        )
        conn.commit()
        response = jsonify(success=True, message="Despesa editada com sucesso!")
    except Exception as e:
        response = jsonify(success=False, message=str(e))
    finally:
        cur.close()
        conn.close()

    return response

@app.route('/delete_expense', methods=['POST'])
def delete_expense():
    id = request.form['id']

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM contas WHERE id = %s", (id,))
        conn.commit()
        response = jsonify(success=True, message="Despesa excluída com sucesso!")
    except Exception as e:
        response = jsonify(success=False, message=str(e))
    finally:
        cur.close()
        conn.close()

    return response

@app.route('/edit_income', methods=['POST'])
def edit_income():
    id = request.form['id']
    amount = request.form['amount']
    income_type = request.form['income_type']
    description = request.form['description']
    month = request.form['month']
    year = request.form['year']
    recurring = 'recurring' in request.form

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "UPDATE incomes SET amount = %s, income_type = %s, description = %s, month = %s, year = %s, recurring = %s WHERE id = %s",
            (amount, income_type, description, month, year, recurring, id)
        )
        conn.commit()
        response = jsonify(success=True, message="Provento editado com sucesso!")
    except Exception as e:
        response = jsonify(success=False, message=str(e))
    finally:
        cur.close()
        conn.close()

    return response

@app.route('/delete_income', methods=['POST'])
def delete_income():
    id = request.form['id']

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM incomes WHERE id = %s", (id,))
        conn.commit()
        response = jsonify(success=True, message="Provento excluído com sucesso!")
    except Exception as e:
        response = jsonify(success=False, message=str(e))
    finally:
        cur.close()
        conn.close()

    return response

@app.errorhandler(500)
def internal_error(error):
    return f"500 error: {error}", 500

if __name__ == '__main__':
    app.run(host='192.168.100.100', port=5000, debug=True)
