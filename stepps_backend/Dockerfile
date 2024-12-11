FROM python:3.10-slim

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo de dependências para dentro do contêiner
COPY requirements.txt ./

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && apt-get clean

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o script de inicialização
COPY init.sh /app/init.sh
RUN chmod +x /app/init.sh

# Comando para rodar o script de inicialização
ENTRYPOINT ["/app/init.sh"]
# Copia o código da aplicação para o contêiner
COPY . .

# Expõe a porta do Django
EXPOSE 8000

# Comando para rodar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]