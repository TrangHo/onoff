Spree::Price.class_eval do
  DISCOUNT_DEFINITION = [PERCENTAGE = 'Percentage', AMOUNT = 'Amount']
  DISCOUNT_TYPES = { PERCENTAGE => 1, AMOUNT => 2 }
  DISCOUNT_SELECTION = DISCOUNT_TYPES.map { |k, v| [k, v] }

  validates :discount_type, inclusion: { in: DISCOUNT_TYPES.values }, :if => :enable_discount?
  validate :discount_amount_validation

  attr_accessible :discount_type, :discount_amount, :enable_discount

  def original_price
    read_attribute :amount
  end

  def amount
    if enable_discount
      if discount_type == DISCOUNT_TYPES[PERCENTAGE]
        read_attribute(:amount) * (100 - discount_amount)/100
      elsif discount_type == DISCOUNT_TYPES[AMOUNT]
        read_attribute(:amount) - discount_amount
      end
    else
      read_attribute(:amount)
    end
  end

  private
  def discount_amount_validation
    if enable_discount && amount.present? && DISCOUNT_TYPES.values.include?(discount_type)
      if discount_type == DISCOUNT_TYPES[PERCENTAGE]
        self.errors[:discount_amount] << 'Cannot be greater than or equal 100%' unless discount_amount < 100
      elsif discount_type == DISCOUNT_TYPES[AMOUNT]
        self.errors[:discount_amount] << 'Cannot be greater than or equal amount' unless discount_amount < amount
      end
    end
  end
end
