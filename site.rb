require 'rubygems'
require 'sinatra'

get '/' do
  headers['Cache-Control'] = 'public, max-age=300'
  File.read(File.join('public', 'index.html'))
end