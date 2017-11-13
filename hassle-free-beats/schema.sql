create table users (id serial primary key, user_id varchar(40), email varchar(50));

create table beats (beat_id serial primary key, mp3_url varchar(70), cover_url varchar(70), title varchar(40), artist_or_genre varchar(40));

create table cart (beat integer references beats (beat_id), user_id integer references users (id));

create table invoice (invoice_id serial primary key, invoice_date varchar(40), total float, customer_id integer references users (id)); 

create table invoice_line (line_id serial primary key, invoice_reference_id integer references invoice (invoice_id), sold_beat integer references beats (beat_id), price float);