# JWT Token Generation and Environment Setup

This guide covers generating RSA keys for JWT (RS256), encoding them in base64, and adding them to the `.env` file for easy access.

---

## 📌 **1. Generate RSA Keys**

You will need two pairs of RSA keys:
- **Access Token** (Private & Public)
- **Refresh Token** (Private & Public)

### Generate Access Token Keys
```bash
openssl genpkey -algorithm RSA -out access_private.pem
openssl rsa -in access_private.pem -pubout -out access_public.pem
```

### Generate Refresh Token Keys
```bash
openssl genpkey -algorithm RSA -out refresh_private.pem
openssl rsa -in refresh_private.pem -pubout -out refresh_public.pem
```

✅ This will create four files:
```
access_private.pem
access_public.pem
refresh_private.pem
refresh_public.pem
```

---

## 📌 **2. Encode Keys to Base64**

We encode the keys in **base64** for easier storage in environment variables.

### Encode Access Keys
```bash
echo "ACCESS_TOKEN_PRIVATE_KEY=$(cat access_private.pem | base64 -w 0)" >> ./api/.env
echo "ACCESS_TOKEN_PUBLIC_KEY=$(cat access_public.pem | base64 -w 0)" >> ./api/.env
```

### Encode Refresh Keys
```bash
echo "REFRESH_TOKEN_PRIVATE_KEY=$(cat refresh_private.pem | base64 -w 0)" >> ./api/.env
echo "REFRESH_TOKEN_PUBLIC_KEY=$(cat refresh_public.pem | base64 -w 0)" >> ./api/.env
```

✅ This appends the encoded keys to the `./api/.env` file.

If you want to **overwrite** instead of **append**, use `>` instead of `>>`.

---

## 📌 **3. Verify Environment Setup**

Check that the keys are correctly written in `./api/.env`:

```bash
cat ./api/.env
```

The output should be:

```env
ACCESS_TOKEN_PRIVATE_KEY="MIICXgIBAAKBgQC..."
ACCESS_TOKEN_PUBLIC_KEY="MIGfMA0GCSqGSI..."
REFRESH_TOKEN_PRIVATE_KEY="MIICdgIBADANB..."
REFRESH_TOKEN_PUBLIC_KEY="MIGfMA0GCSqGSI..."
```


