3. Install the required dependencies:

```bash
yarn install
```

4. Configure Supabase:

- If you haven't already, create an new account on [Supabase](https://supabase.io/).
- Create a new project and obtain your Supabase URL and API key.
- Enable Email Provider and Confirm Email in the Authentication > Configuration > Providers section..
- Customize the confirm sign up email template in Authentication > Configuration > Email Templates to include a 6-digit OTP:
  - Subject heading: Confirm Your Sign Up
  - Message Body: `<p>Your 6 digit code is {{ .Token}}</p>`
- Update the `supabaseUrl` and `supabaseKey` variables in the `./context/supabase.ts` file with your Supabase URL and API key respectively.

5. Start the Expo development server:

```bash
yarn start
```
