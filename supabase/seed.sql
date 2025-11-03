-- 🧑‍💻 إدخال مستخدمين تجريبيين
INSERT INTO profiles (id, phone, avatar_url, created_at, updated_at)
VALUES
  ('52e2a9b4-179f-445f-bfd8-9276281bd91a', '+21650000000', 'https://i.pravatar.cc/150?img=1', now(), now()),
  ('3d0160c8-f809-4005-9aab-00afa8b158c4', '+21651111111', 'https://i.pravatar.cc/150?img=2', now(), now())
ON CONFLICT (id) DO NOTHING;

-- 📝 إدخال منشورات تجريبية
INSERT INTO posts (title, content, author_id, created_at)
VALUES
  ('أول منشور تجريبي', 'هذا مثال على منشور تمت إضافته من seed.sql', '52e2a9b4-179f-445f-bfd8-9276281bd91a', now()),
  ('منشور ثاني', 'بيانات تجريبية لتجربة الواجهة', '3d0160c8-f809-4005-9aab-00afa8b158c4', now())
ON CONFLICT DO NOTHING;

-- 💬 إدخال رسائل تجريبية
INSERT INTO messages (sender_id, receiver_id, content, created_at)
VALUES
  ('52e2a9b4-179f-445f-bfd8-9276281bd91a', '3d0160c8-f809-4005-9aab-00afa8b158c4', 'مرحبًا أحمد!', now()),
  ('3d0160c8-f809-4005-9aab-00afa8b158c4', '52e2a9b4-179f-445f-bfd8-9276281bd91a', 'أهلاً! كيف حالك؟', now())
ON CONFLICT DO NOTHING;
