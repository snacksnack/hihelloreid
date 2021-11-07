require 'pony'
require 'rack-flash'
require 'sendgrid-ruby'
require 'sinatra/base'
require 'sinatra/activerecord'
require 'slim'

include SendGrid

class Contact < ActiveRecord::Base
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, format: { with: VALID_EMAIL_REGEX },
                    length: { maximum: 50 },
                    presence: true,
                    uniqueness: true
  validates :name,    presence: true, length: { maximum: 50 }
  validates :subject, presence: true, length: { maximum: 50 }
  validates :message, presence: true, length: { maximum: 500 }
end

class ReidOnePage < Sinatra::Base
  register Sinatra::ActiveRecordExtension
  enable :sessions
  use Rack::Flash

  configure do
    #Pony.options = {
    #  :via => 'smtp',
    #  :via_options => {
    #    :address => 'smtp.sendgrid.net',
    #    :port => 587,
    #    :domain => 'hihelloreid.com',
    #    :user_name => ENV['SENDGRID_USERNAME'],
    #    :user_name => 'apikey',
    #    :password => ENV['SENDGRID_PASSWORD'],
    #    :authentication => :plain,
    #    :enable_starttls_auto => true
    #  }
    #}
  end

  get '/' do
    slim :'index'
  end

  get '/.well-known/acme-challenge/2d1lSZhMT6I4sdQEA_Suv_pKH9vG8PISsCGQgRYPT2o' do
    return "2d1lSZhMT6I4sdQEA_Suv_pKH9vG8PISsCGQgRYPT2o.nnCA1tSAOqqnvxpst5COtAJt3i9Fc3TbwRQfdGLSObU"
  end

  post '/contact' do
    @contact = Contact.new(name: params[:name], email: params[:email],
                            subject: params[:subject], message: params[:message])
    send_mail(@contact)
    if request.xhr? && @contact.save
      flash.now[:message] = "Thank you, I'll be in touch soon!"
    else
      flash.now[:message] = "Oops, something's wrong with your form submission."
    end
  end

  def send_mail(contact)
    from = Email.new(email: contact.email)
    to = Email.new(email: 'hirereidcollins@gmail.com')
    subject = contact.subject
    content = Content.new(type: 'text/plain', value: contact.content)
    mail = Mail.new(from, subject, to, content)
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    response = sg.client.mail._('send').post(request_body: mail.to_json)
    puts response.status_code
    puts response.body
    puts response.headers
  
    #Pony.mail(
    #  :from => contact.name + '<' + contact.email + '>',
    #  :to => 'hire.reid.collins@gmail.com',
    #  :subject => 'new hihelloreid contact',
    #  :body => contact.message
    #)
  end
end