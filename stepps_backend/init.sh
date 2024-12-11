#!/bin/bash

# Espera o banco de dados estar pronto
echo "Esperando o banco de dados iniciar..."
wait-for-it db:5432 --timeout=60 --strict -- echo "Banco de dados pronto!"

echo "Aplicando as migrações do banco de dados..."
python manage.py migrate || { echo "Erro nas migrações"; exit 1; }

# Cria o superusuário (caso não exista)
echo "Criando superusuário..."
echo "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@admin.com', 'admin123')" | python manage.py shell

# Insere os dados no modelo Indicator
echo "Inserindo dados no modelo Indicator..."
python manage.py shell <<EOF
from dashboard.models import Indicator

# Criar os indicadores
Indicator.objects.create(name="Total Number of People Who Passed Through This Area", value=114)
Indicator.objects.create(name="Current Number of People in This Area", value=18)
Indicator.objects.create(name="Total Accidents Today", value=0)
Indicator.objects.create(name="Total Events Today", value=2)
EOF

# Inicia o servidor
exec "$@"
